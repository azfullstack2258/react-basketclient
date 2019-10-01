import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Section } from '../../components';
import { loadProducts } from '../../reducer/product';
import { addProductItem } from '../../reducer/checkout';
import { basketItemCountSelector } from '../../selectors';

class ProductList extends Component {
  state = {
    products: [
      {
        "sku": 1,
        "name": "Product One",
        "description": "Product One description",
        "price": 1.11
      },
      {
        "sku": 2,
        "name": "Product Two",
        "description": "Product Two description",
        "price": 2.22
      },
      {
        "sku": 3,
        "name": "Product Three",
        "description": "Product Three description",
        "price": 3.33
      },
      {
        "sku": 4,
        "name": "Product Four",
        "description": "Product Four description",
        "price": 4.44
      },
      {
        "sku": 5,
        "name": "Product Five",
        "description": "Product Five description",
        "price": 5.55
      }
    ]
    
  };

  componentDidMount() {
    this.props.loadProducts();
  }

  onAddToBasket = item => () => {
    this.props.addProductItem(item);
  }

  onGotoCheckout = () => {
    this.props.history.push('/checkout')
  }

  render() {
    const { loading, itemCount } = this.props;
    const { products } = this.state;

    return (
      <div>
        <Section>
          <button onClick={this.onGotoCheckout}>Basket:&nbsp;{itemCount}</button>
        </Section>
        <Section>
        {!loading && products.map(p => (
          <Section key={p.sku}>{p.name}&nbsp;${p.price}&nbsp;<button onClick={this.onAddToBasket(p)}>Add to basket</button></Section>
        ))}
        {
          loading && <p>Loading products...</p> 
        }
        </Section>
        <Section>
          <button onClick={this.onGotoCheckout}>Proceed to checkout</button>
        </Section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
  loading: state.product.loading,
  itemCount: basketItemCountSelector(state)
});

const mapDispatchToProps = {
  loadProducts,
  addProductItem
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  itemCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  loadProducts: PropTypes.func.isRequired,
  addProductItem: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
