export default {
  uA:
    (typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase()) ||
    '',

  get isMobileIE() {
    return /iemobile/i.test(this.uA)
  },

  get isMobileOpera() {
    return /opera mini/i.test(this.uA)
  },

  get isIOS() {
    return /iphone|ipad|ipod/i.test(this.uA)
  },

  get isIpad(){
    return navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2
  },

  get isBlackberry() {
    return /blackberry/i.test(this.uA)
  },

  get isMobileAndroid() {
    return /android.*mobile/.test(this.uA)
  },

  get isAndroid() {
    /* eslint-disable */
    return (
      this.isMobileAndroid ||
      (!this.isMobileAndroid && /android/i.test(this.uA))
    )
  },

  get isFirefox() {
    return this.uA.indexOf('firefox') > -1
  },

  get safari() {
    return this.uA.match(/version\/[\d\.]+.*safari/)
  },

  get isSafari() {
    /* eslint-disable */
    return !!this.safari && !this.isAndroid
  },

  get isSafariOlderThan8() {
    var limit = 8
    var version = limit
    if (this.isSafari) {
      var versionWithVersionWord = this.safari[0].match(/version\/\d{1,2}/)
      version = +versionWithVersionWord[0].split('/')[1]
    }
    return version < limit
  },

  get isIEolderThan11() {
    return this.uA.indexOf('msie') > -1
  },

  get isIE11() {
    return (
      typeof navigator !== 'undefined' &&
      navigator.appVersion.indexOf('Trident/') > 0
    )
  },

  get isIE() {
    return this.isIEolderThan11 || this.isIE11
  },

  get isEdge() {
    return /Edge\/\d./i.test(this.uA)
  },

  get isMac() {
    return (
      typeof navigator !== 'undefined' &&
      navigator.platform.toLowerCase().indexOf('mac') > -1
    )
  },

  get isWin() {
    return (
      typeof navigator !== 'undefined' &&
      navigator.platform.toLowerCase().indexOf('win') > -1
    )
  },

  get isMobile() {
    return (
      this.isMobileAndroid ||
      this.isBlackberry ||
      this.isIOS ||
      this.isIpad ||
      this.isMobileOpera ||
      this.isMobileIE
    )
  },

  get isTouch() {
    return typeof window !== 'undefined' && 'ontouchstart' in window
  },
}
