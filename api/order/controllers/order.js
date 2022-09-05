'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require('stripe')(
  'pk_test_51LeSvbC5gpj7TggIcIRpH2fjo7eKdmfWed8ptdLh22AcmM0LKJn8wfIcWymCYr53ThAWUAa6mtOD9bl9wnCbKNb100oCVVddkc',
)

module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { address, amount, dishes, token } = JSON.parse(ctx.request.body)
    // charge on stripe
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'jpy',
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
      source: token,
    })

    //データベースに注文を登録する
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      amount: stripeAmount,
      address,
      dishes,
    })

    return order
  },
}
