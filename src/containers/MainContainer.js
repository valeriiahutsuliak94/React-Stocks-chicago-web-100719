import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      stocks: [],
      portfolioStocks: [],
      filterStocks: []
    }
  }

  handleStockClick = (stock) => {
    console.log('clicked', stock)
    const addToPortfolio = this.state.portfolioStocks.slice()
    addToPortfolio.push(stock)
    this.setState({portfolioStocks: addToPortfolio})
  }

  handlePortfolioClick = portfolioStock => {
    // console.log('portfolio', portfolioStock)
    const removeIndex = this.state.portfolioStocks.findIndex(stock => stock.id === portfolioStock.id)
    let replaceArray = this.state.portfolioStocks.slice()
    replaceArray.splice(removeIndex, 1)
    this.setState({portfolioStocks: replaceArray})
  }

  handleSearch = event => {
    console.log(event.target.type)
    if (event.target.type === 'select-one') {
      this.filterStocks(event.target.value)
    } else {
      this.sortStocks(event.target.value)
    }
  }

  sortStocks = sortWord => {
    if (sortWord === 'Price') {
      const sortedArray = this.state.filterStocks.sort((stock1, stock2) => stock1.price - stock2.price)
      this.setState({filterStocks: sortedArray})
    } else {
      const sortedArray = this.state.filterStocks.sort((stock1, stock2) => (stock1.name > stock2.name) ? 1 : -1)
      this.setState({filterStocks: sortedArray})
    }
  }

  filterStocks = (filterWord) => {
    const newFilter = this.state.stocks.filter(stock => stock.type === filterWord)
    this.setState({filterStocks: newFilter})
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(stocks => this.setState({
      stocks: stocks,
      filterStocks: stocks
    }))
  }

  render() {
    return (
      <div>
        <SearchBar  handleSearch={this.handleSearch}/>

          <div className="row">
            <div className="col-8">

              <StockContainer handleClick={this.handleStockClick} stocks={this.state.filterStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer handleClick={this.handlePortfolioClick} stocks={this.state.portfolioStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
