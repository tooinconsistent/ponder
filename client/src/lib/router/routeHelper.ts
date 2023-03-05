// Adopted from https://github.com/lukeed/regexparam

export const routeToRegex = (
  route: string,
  loose?: boolean
): { keys: string[]; pattern: RegExp } => {
  let c,
    o,
    tmp,
    ext,
    pattern = "";

  const keys = [];
  const arr = route.split("/");

  arr[0] || arr.shift();

  while ((tmp = arr.shift())) {
    c = tmp[0];
    if (c === "*") {
      keys.push("wild");
      pattern += "/(.*)";
    } else if (c === ":") {
      o = tmp.indexOf("?", 1);
      ext = tmp.indexOf(".", 1);
      keys.push(tmp.substring(1, ~o ? o : ~ext ? ext : tmp.length));
      pattern += !!~o && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
      if (~ext) pattern += (~o ? "?" : "") + "\\" + tmp.substring(ext);
    } else {
      pattern += "/" + tmp;
    }
  }

  return {
    keys: keys,
    pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i"),
  };
};

const RGX = /(\/|^)([:*][^/]*?)(\?)?(?=[/.]|$)/g;

export const injectValuesIntoRoute = (
  route: string,
  values: Record<string, string | number>
) => {
  return route.replace(
    RGX,
    (x: string, lead: string, key: string, optional: string) => {
      const v = values[key == "*" ? "wild" : key.substring(1)];
      return v ? "/" + String(v) : optional || key == "*" ? "" : "/" + key;
    }
  );
};
