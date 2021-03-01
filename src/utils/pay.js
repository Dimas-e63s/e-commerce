export function pay({ amount, description, data = {}, accountId }) {
  const widget = new cp.CloudPayments();
  return new Promise((resolve, reject) => {
    widget.pay(
      'charge',
      {
        publicId: 'test_api_00000000000000000000001',
        description,
        amount,
        currency: 'EUR',
        invoiceId: '1234567',
        accountId,
        skin: 'mini',
        data
      },
      {
        onSuccess(options) {
          resolve(options);
        },
        onFail(reason, options) {
          reject(reason);
        }
      }
    );
  });
}
