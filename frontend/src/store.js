const store = {
  alerts: {
    counter: 0,
    array: [],
    pullAlert(alertId) {
      this.array = this.array.filter(alert => {
        return alert.id !== alertId;
      });
    },
    pushAlert(alert) {
      alert.id = this.counter;
      this.counter++;
      this.array.push(alert);
    }
  }
};

export default store;
