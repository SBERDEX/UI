import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { uint256Max } from '../lib/constants';
import { MetaMaskContext } from '../contexts/MetaMask';
import debounce from '../lib/debounce';
import PathFinder from '../lib/pathFinder';

const pairsToTokens = (pairs) => {
  const tokens = pairs.reduce((acc, pair) => {
    acc[pair.token0.address] = {
      symbol: pair.token0.symbol,
      address: pair.token0.address,
      selected: false
    };
    acc[pair.token1.address] = {
      symbol: pair.token1.symbol,
      address: pair.token1.address,
      selected: false
    };

    return acc;
  }, {});

  return Object.keys(tokens).map(k => tokens[k]);
}

const countPathTokens = (path) => (path.length - 1) / 2 + 1;

const pathToTypes = (path) => {
  return ["address"].concat(new Array(countPathTokens(path) - 1).fill(["uint24", "address"]).flat());
}


//доделать
const SwapInput = ({ token, tokens, onChange, amount, setAmount, disabled, readOnly }) => {
  return (
    <fieldset className="SwapInput" disabled={disabled}>
      <input type="text" id={token + "_amount"} placeholder="0.0" value={amount} onChange={(ev) => setAmount(ev.target.value)} readOnly={readOnly} />
      <select name="token" value={token} onChange={onChange}>
        {tokens.map(t => <option key={`${token}_${t.symbol}`}>{t.symbol}</option>)}
      </select>
    </fieldset>
  );
}

const ChangeDirectionButton = ({ onClick, disabled }) => {
  return (
    <SwitchButton  onClick={onClick} disabled={disabled}  variant='flat'>
        <Image src={switchIcon} width={31} height={32} alt="Switch icon" />
    </SwitchButton>
  )
}

// убрать 
const SlippageControl = ({ setSlippage, slippage }) => {
  return (
    <fieldset className="SlippageControl">
      <label htmlFor="slippage">Slippage tolerance, %</label>
      <input type="text" value={slippage} onChange={(ev) => setSlippage(ev.target.value)} />
    </fieldset>
  );
}

const SwapForm = ({ setPairs }) => {
  const metamaskContext = useContext(MetaMaskContext);
  const enabled = metamaskContext.status === 'connected';
  const account = metamaskContext.account;

  const [zeroForOne, setZeroForOne] = useState(true);
  const [amount0, setAmount0] = useState(0);
  const [amount1, setAmount1] = useState(0);
  const [tokenIn, setTokenIn] = useState();
  const [manager, setManager] = useState();
  const [quoter, setQuoter] = useState();
  const [loading, setLoading] = useState(false);
  const [addingLiquidity, setAddingLiquidity] = useState(false);
  const [removingLiquidity, setRemovingLiquidity] = useState(false);
  const [slippage, setSlippage] = useState(0.1);
  const [tokens, setTokens] = useState();
  const [path, setPath] = useState();
  const [pathFinder, setPathFinder] = useState();

  useEffect(() => {
    setManager(new ethers.Contract(
      process.env.managerAddress,
      process.env.ABIs.Manager,
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
    ));
    setQuoter(new ethers.Contract(
      process.env.quoterAddress,
      process.env.ABIs.Quoter,
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
    ));

    setTokenIn(new ethers.Contract(
      process.env.wethAddress,
      process.env.ABIs.ERC20,
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
    ));

    loadPairs().then((pairs) => {
      const pair_ = pairs.filter((pair) => {
        return pair.token0.address === process.env.wethAddress || pair.token1.address === process.env.wethAddress;
      })[0];
      const path_ = [
        process.env.wethAddress,
        pair_.fee,
        pair_.token0.address === process.env.wethAddress ? pair_.token1.address : pair_.token0.address
      ];

      setPairs(pairs);
      setPath(path_);
      setPathFinder(new PathFinder(pairs));
      setTokens(pairsToTokens(pairs));
    });
  }, [setPairs]);

  /**
   * Load pairs from a Factory address by scanning for 'PoolCreated' events.
   * 
   * @returns array of 'pair' objects.
   */
  const loadPairs = () => {
    const factory = new ethers.Contract(
      process.env.factoryAddress,
      process.env.ABIs.Factory,
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
    );

    return factory.queryFilter("PoolCreated", "earliest", "latest")
      .then((events) => {
        const pairs = events.map((event) => {
          return {
            token0: {
              address: event.args.token0,
              symbol: process.env.tokens[event.args.token0].symbol
            },
            token1: {
              address: event.args.token1,
              symbol: process.env.tokens[event.args.token1].symbol
            },
            fee: event.args.fee,
            address: event.args.pool
          }
        });

        return Promise.resolve(pairs);
      }).catch((err) => {
        console.error(err)
      });
  }


  /**
   * Swaps tokens by calling Manager contract. Before swapping, asks users to approve spending of tokens.
   */
  const swap = (e) => {
    e.preventDefault();

    const amountIn = ethers.utils.parseEther(zeroForOne ? amount0 : amount1);
    const amountOut = ethers.utils.parseEther(zeroForOne ? amount1 : amount0);
    const minAmountOut = amountOut.mul((100 - parseFloat(slippage)) * 100).div(10000);
    const packedPath = ethers.utils.solidityPack(pathToTypes(path), path);
    const params = {
      path: packedPath,
      recipient: account,
      amountIn: amountIn,
      minAmountOut: minAmountOut
    };
    const token = tokenIn.attach(path[0]);

    token.allowance(account, process.env.managerAddress)
      .then((allowance) => {
        if (allowance.lt(amountIn)) {
          return token.approve(process.env.managerAddress, uint256Max).then(tx => tx.wait())
        }
      })
      .then(() => {
        return manager.swap(params).then(tx => tx.wait())
      })
      .then(() => {
        alert('Swap succeeded!');
      }).catch((err) => {
        console.error(err);
        alert('Failed!');
      });
  }

  /**
   * Calculates output amount by querying Quoter contract. Sets 'priceAfter' and 'amountOut'.
   */
  const updateAmountOut = debounce((amount) => {
    if (amount === 0 || amount === "0") {
      return;
    }

    setLoading(true);

    const packedPath = ethers.utils.solidityPack(pathToTypes(path), path);
    const amountIn = ethers.utils.parseEther(amount);

    quoter.callStatic
      .quote(packedPath, amountIn)
      .then(({ amountOut }) => {
        zeroForOne ? setAmount1(ethers.utils.formatEther(amountOut)) : setAmount0(ethers.utils.formatEther(amountOut));
        setLoading(false);
      })
      .catch((err) => {
        zeroForOne ? setAmount1(0) : setAmount0(0);
        setLoading(false);
        console.error(err);
      })
  })

  /**
   *  Wraps 'setAmount', ensures amount is correct, and calls 'updateAmountOut'.
   */
  const setAmountFn = (setAmountFn) => {
    return (amount) => {
      amount = amount || 0;
      setAmountFn(amount);
      updateAmountOut(amount)
    }
  }

  const toggleAddLiquidityForm = () => {
    if (!addingLiquidity) {
      if (path.length > 3) {
        const token0 = tokens.filter(t => t.address === path[0])[0];
        const token1 = tokens.filter(t => t.address === path[path.length - 1])[0];
        alert(`Cannot add liquidity: ${token0.symbol}/${token1.symbol} pair doesn't exist!`);
        return false;
      }
    }

    setAddingLiquidity(!addingLiquidity);
  }

  const toggleRemoveLiquidityForm = () => {
    if (!removingLiquidity) {
      if (path.length > 3) {
        const token0 = tokens.filter(t => t.address === path[0])[0];
        const token1 = tokens.filter(t => t.address === path[path.length - 1])[0];
        alert(`Cannot add liquidity: ${token0.symbol}/${token1.symbol} pair doesn't exist!`);
        return false;
      }
    }

    setRemovingLiquidity(!removingLiquidity);
  }

  /**
   * Set currently selected pair based on selected tokens.
   * 
   * @param {symbol} selected token symbol
   * @param {index} token index
   */
  const selectToken = (symbol, index) => {
    let token0, token1;

    if (index === 0) {
      token0 = tokens.filter(t => t.symbol === symbol)[0].address;
      token1 = path[path.length - 1];
    }

    if (index === 1) {
      token0 = path[0];
      token1 = tokens.filter(t => t.symbol === symbol)[0].address;
    }

    if (token0 === token1) {
      return false;
    }

    try {
      setPath(pathFinder.findPath(token0, token1));
      setAmount0(0);
      setAmount1(0);
    } catch {
      alert(`${token0.symbol}/${token1.symbol} pair doesn't exist!`);
    }
  }

  /**
   * Toggles swap direction.
   */
  const toggleDirection = (e) => {
    e.preventDefault();

    setZeroForOne(!zeroForOne);
    setPath(path.reverse());
  }

  const tokenByAddress = (address) => {
    return tokens.filter(t => t.address === address)[0];
  }

  return (
    <section className="SwapContainer">
        <h1>Swap tokens</h1>
      {path ?
        <form className="SwapForm">
          <SwapInput
            amount={zeroForOne ? amount0 : amount1}
            disabled={!enabled || loading}
            onChange={(ev) => selectToken(ev.target.value, 0)}
            readOnly={false}
            setAmount={setAmountFn(zeroForOne ? setAmount0 : setAmount1)}
            token={tokenByAddress(path[0]).symbol}
            tokens={tokens} />
          <ChangeDirectionButton zeroForOne={zeroForOne} onClick={toggleDirection} disabled={!enabled || loading} />
          <SwapInput
            amount={zeroForOne ? amount1 : amount0}
            disabled={!enabled || loading}
            onChange={(ev) => selectToken(ev.target.value, 1)}
            readOnly={true}
            token={tokenByAddress(path[path.length - 1]).symbol}
            tokens={tokens.filter(t => t.address !== path[0])} />
          <SlippageControl
            setSlippage={setSlippage}
            slippage={slippage} />
          <button className='swap' disabled={!enabled || loading} onClick={swap}>Swap</button>
        </form>
        :
        <span>Loading pairs...</span>}
    </section>
  )
}

export default SwapForm;