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
        {text: 'Delivery Information', url: '/'},
        {text: 'Discount', url: '/'},
        {text: 'Sitemap', url: '/'},
        {text: 'Privacy Policy', url: '/'},
        {text: 'My Account', url: '/'},
    ]},
    {
      title: 'My account',
      children: [
        {text: 'Sign In', url: '/auth'},
        {text: 'View Cart', url: '/cart'},
        {text: 'My Wishlist', url: '/wishlist'},
        {text: 'Check out', url: '/checkout'},
        {text: 'My Order', url: '/'}
      ]
    },
    {
      title: 'Help',
      children: [
        {text: 'F.A.Q.', url: '/'},
        {text: 'Shipping', url: '/'},
        {text: 'My Wishlist', url: '/wishlist'},
        {text: 'Contact Us', url: '/'},
        {text: 'Privacy Policy', url: '/'}
      ]
    }
]