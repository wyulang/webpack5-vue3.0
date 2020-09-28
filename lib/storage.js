export default function storage(key, value, type) {
  if (type) {
    localStorage.removeItem(key);
  } else {
    if (!!value) {
      return localStorage.setItem(key, JSON.stringify(value));
    } else {
      let val = localStorage.getItem(key) || "";
      return (val && JSON.parse(val)) || "";
    }
  }
}

export const storages = (key, value, type) => {
  if (type) {
    localStorage.removeItem(key);
  } else {
    if (!!value) {
      return localStorage.setItem(key, JSON.stringify(value));
    } else {
      let val = localStorage.getItem(key) || "";
      return (val && JSON.parse(val)) || "";
    }
  }
}

export const session = (key, value, type) => {
  if (type) {
    sessionStorage.removeItem(key);
  } else {
    if (!!value) {
      return sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      let val = sessionStorage.getItem(key) || "";
      return (val && JSON.parse(val)) || "";
    }
  }
}