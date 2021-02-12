export const headerTemplate = {
    prefix:'fab',
    contacts: [
      {
        icon: 'phone',
        url: 'tel:+1123456789',
        text: '+1 123 456 789'
      },
      {
        icon: 'envelope',
        url: 'mailto:info@company.com',
        text: 'info@company.com'
      }],
    media: [
       {
        icon: 'instagram',
        url: 'https://www.instagram.com/?hl=ru',
      },
      {
        icon: 'facebook-square',
        url: 'https://www.facebook.com/',
      },{
        icon: 'linkedin-in',
        url: 'https://www.linkedin.com',
      },
      {
        icon: 'twitter',
        url: 'https://twitter.com/?lang=ru',
      } 
    ]
}

export const navbarTemplate = [
    {
      title: 'Information',
      children: [
        {text: 'Delivery Information'},
        {text: 'Discount'},
        {text: 'Sitemap'},
        {text: 'Privacy Policy'},
        {text: 'My Account'},
    ]},
    {
      title: 'My account',
      children: [
        {text: 'Sign In'},
        {text: 'View Cart'},
        {text: 'My Wishlist'},
        {text: ' Check out'},
        {text: 'My Order'}
      ]
    },
    {
      title: 'Help',
      children: [
        {text: 'F.A.Q.'},
        {text: 'Shipping'},
        {text: 'My Wishlist'},
        {text: 'Contact Us'},
        {text: 'Privacy Policy'}
      ]
    }
]