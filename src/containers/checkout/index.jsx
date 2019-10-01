import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Section } from '../../components';
import {
  removeBasketItem,
  changeItemQuantity,
  proceedCheckout,
  applyPromoCode
} from '../../reducer/checkout';
import { basketItemCountSelector, basketTotalPriceSelector } from '../../selectors';
import { LuhnCheck } from '../../utils';

class Checkout extends Component {
  state = {
    promoCode: '',
    cardNumber: '',
    isValidCard: false
  };

  onGotoProductList = () => {
    this.props.history.push('/');
  };

  onRemoveItem = sku => () => {
    this.props.removeBasketItem(sku);
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value }, () => {
      if (name === 'cardNumber') {
        this.setState({ isValidCard: LuhnCheck(this.state.cardNumber) });
      }
    });
  };

  onApplyPromoCode = () => {
    this.props.applyPromoCode(this.state.promoCode);
  };

  onCheckout = () => {
    const { isValidCard, cardNumber } = this.state;
    const { itemCount } = this.props;

    if (itemCount && isValidCard) {
      this.props.proceedCheckout(cardNumber);
    } else {
      console.error('checkout error');
    }
  };

  handleQuantityChange = sku => e => {
    this.props.changeItemQuantity({ sku, count: parseInt(e.target.value) });
  };

  render() {
    const { basketItems, itemCount, subTotal, discount } = this.props;
    const { isValidCard } = this.state;

    return (
      <div>
        <Section>
          <button onClick={this.onGotoProductList}>Continue Shopping</button>&nbsp;
          <button>Basket: {itemCount}</button>
        </Section>
        <Section>
        {basketItems.map(ci => (
          <Section key={ci.sku}>
            {ci.name}&nbsp;
            <select value={ci.quantity} onChange={this.handleQuantityChange(ci.sku)}>
              {[0,1,2,3,4,5,6,7,8,9].map(i => <option key={i} value={i + 1}>{i + 1}</option>)}
            </select>&nbsp;
            ${(ci.quantity * ci.price).toFixed(2)}&nbsp;
            <button onClick={this.onRemoveItem(ci.sku)}>Remove</button>
          </Section>
        ))}
        </Section>
        <Section>
          <label>Enter Promo Code: &nbsp;</label>
          <input type="text" onChange={this.handleChange('promoCode')} olaceholder="Promo code..." />
          <button onClick={this.onApplyPromoCode}>Apply</button>
        </Section>
        <Section>
          <Section>Sub Total: &nbsp; <span>${subTotal.toFixed(2)}</span></Section>
          <Section>Promotional discount amount: &nbsp; <span>{discount}%</span></Section>
          <Section>Basket Total: &nbsp; <span>${(subTotal * (100 - discount) / 100).toFixed(2)}</span></Section>
          <Section>
            Please enter your credit card number: &nbsp;
            <input type="text" placeholder="Card number here..." onChange={this.handleChange('cardNumber')} />
            {!isValidCard && <label>(Card is invalid.)</label>}
          </Section>
        </Section>
        <Section>
          <button onClick={this.onCheckout}>Checkout</button>
        </Section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  basketItems: state.checkout.basketItems,
  itemCount: basketItemCountSelector(state),
  subTotal: basketTotalPriceSelector(state),
  discount: state.checkout.discount
});

const mapDispatchToProps = {
  removeBasketItem,
  changeItemQuantity,
  applyPromoCode,
  proceedCheckout
};

Checkout.protoTypes = {
  history: PropTypes.object.isRequired,
  itemCount: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeBasketItem: PropTypes.func.isRequired,
  changeItemQuantity: PropTypes.func.isRequired,
  applyPromoCode: PropTypes.func.isRequired,
  proceedCheckout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
