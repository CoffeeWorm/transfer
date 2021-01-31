const { isFunction, isString, isRegExp, isBoolean } = require('lodash');

class Chain {
  constructor() {
    this.context = {};
    this.chainLst = [];
    this.current = 0;
  }

  async $next() {
    this.current++;
    await this.fire();
  }

  remove(key, cb) {
    const mark = isFunction(key);
    const filterCb = mark
      ? ({ midWare }) => midWare !== key
      : ({ midWare, matcher }) => midWare !== cb || key !== matcher;
    this.chainLst = this.chainLst.filter(filterCb);
  }

  use(key, mw) {
    const mark = isFunction(key);
    if (mark) {
      mw = key;
    }
    const midWare = async (ctx, next) => {
      await mw(ctx, next);
      this.current++;
    };
    this.chainLst.push({ matcher: mark || key, midWare });
  }

  async fire(ctx = {}) {
    Object.assign(this.context, ctx);
    while (this.current !== this.chainLst.length) {
      const chainItem = this.chainLst[this.current];
      const isEffect =
        (isString(chainItem.matcher) &&
          chainItem.matcher === this.context.target) ||
        (isRegExp(chainItem.matcher) &&
          chainItem.matcher.test(this.context.target)) ||
        (isBoolean(chainItem.matcher) && chainItem.matcher);
      if (isEffect) {
        await this.chainLst[this.current].midWare(this.context, this.$next);
      } else {
        this.current++;
      }
    }
    this.current = 0;
  }
}

module.exports = Chain;
