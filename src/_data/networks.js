module.exports = {
  // add copy link, email, sms
  pocket: {
    color: '#EF4154',
    icon: 'pocket.svg',
    url: (d) => `https://getpocket.com/edit.php?url=${d.permalink}`,
  },
  evernote: {
    color: '#24d666',
    icon: 'evernote.svg',
    url: (d) => `https://www.evernote.com/clip.action?title=${d.title}%0D%0A&body=${d.description}%0D%0A${d.permalink}`,
  },
  // add instapaper, feedly, kindle

  // with instanse:
  // add wordpress
  mastodon: {
    color: '#3088D4',
    icon: 'mastodon.svg',
    url: (d) => `https://toot.karamoff.dev/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}${d.via ? `%0D%0A%0D%0A${d.via}` : ''}`,
  },
  diaspora: {
    color: '#2e3436',
    icon: 'diaspora.svg',
    url: (d) => `https://share.diasporafoundation.org/?title=${d.description}&url=${d.permalink}`,
  },
  // add pleroma, movim, xmpp, threema, pixelfed, plume, micro.blog, Hubzilla, Friendica, Gnusocial
  // https://gitlab.com/Makhi/sharer/-/blob/master/assets/js/sharer.js#L153-180
  telegram: {
    color: '#179CDE',
    icon: 'telegram.svg',
    url: (d) => `https://telegram.me/share/url?url=${d.permalink}${d.text ? `&text=${d.text}` : ''}`,
  },
  vk: {
    color: '#4680C2',
    icon: 'vk.svg',
    url: (d) => `https://vk.com/share.php?url=${d.permalink}&title=${d.description}${d.preview ? `&image=${d.preview}` : ''}`,
  },
  twitter: {
    color: '#1DA1F2',
    icon: 'twitter.svg',
    url: (d) => `https://twitter.com/intent/tweet?url=${d.permalink}&text=${d.description}${d.via ? `&via=${d.via}` : ''}`,
  },
  reddit: {
    color: '#FF4500',
    icon: 'reddit.svg',
    url: (d) => `https://www.reddit.com/submit?title=${d.description}&url=${d.permalink}`,
  },
  pinterest: {
    color: '#eE0023',
    icon: 'pinterest.svg',
    url: (d) => `https://pinterest.com/pin/create/button/?url=${d.permalink}&description=${d.description}${d.preview ? `&media=${d.preview}` : ''}`,
  },
  facebook: {
    color: '#1877F2',
    icon: 'facebook.svg',
    url: (d) => `https://www.facebook.com/sharer/sharer.php?u=${d.permalink}`,
  },
  linkedin: {
    color: '#2867B2',
    icon: 'linkedin.svg',
    url: (d) => `https://www.linkedin.com/sharing/share-offsite/?url=${d.permalink}`,
  },
  messenger: {
    color: '#0099FF',
    icon: 'messenger.svg',
    url: (d) => `https://www.facebook.com/dialog/send?app_id=${d.fbAppId}&link=${d.permalink}&redirect_uri=${d.permalink}`,
  },
  mail: {
    color: '#168de2',
    icon: 'mail.svg',
    url: (d) => `https://connect.ok.ru/offer?url=${d.permalink}&title=${d.description}${d.preview ? `&imageUrl=${d.preview}` : ''}`,
  },
  ok: {
    color: '#EE8208',
    icon: 'ok.svg',
    url: (d) => `https://connect.ok.ru/offer?url=${d.permalink}&title=${d.description}${d.preview ? `&imageUrl=${d.preview}` : ''}`,
  },
  viber: {
    color: '#7360F2',
    icon: 'viber.svg',
    url: (d) => `viber://forward?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
  whatsapp: {
    color: '#25D366',
    icon: 'whatsapp.svg',
    url: (d) => `https://wa.me/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
  skype: {
    color: '#00aff0',
    icon: 'skype.svg',
    url: (d) => `https://wa.me/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
  qzone: {
    color: '#f5b53c',
    icon: 'qzone.svg',
    url: (d) => `https://wa.me/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
  renren: {
    color: '#1760a7',
    icon: 'renren.svg',
    url: (d) => `https://wa.me/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
  weibo: {
    color: '#c53220',
    icon: 'weibo.svg',
    url: (d) => `https://wa.me/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
  line: {
    color: '#06C755',
    icon: 'line.svg',
    url: (d) => `https://line.me/R/msg/text/?${d.description}%0D%0A${d.permalink}`,
  },
  // https://yandex.ru/dev/share/
  yandex: {
    color: '#03CECE',
    icon: 'yandex.svg',
    url: (d) => `https://line.me/R/msg/text/?${d.description}%0D%0A${d.permalink}`,
  },
  livejournal: {
    color: '#0d425a',
    icon: 'livejournal.svg',
    url: (d) => `https://wa.me/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
  blogger: {
    color: '#fb8f3d',
    icon: 'blogger.svg',
    url: (d) => `https://wa.me/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
  tumblr: {
    color: '#547093',
    icon: 'tumblr.svg',
    url: (d) => `https://wa.me/?text=${d.description}%0D%0A${d.permalink}${d.text ? `%0D%0A%0D%0A${d.text}` : ''}`,
  },
};
