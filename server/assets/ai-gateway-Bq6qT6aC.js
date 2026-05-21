var marker$3 = "vercel.ai.error";
var symbol$3 = Symbol.for(marker$3);
var _a$3, _b$2;
var AISDKError = class _AISDKError extends (_b$2 = Error, _a$3 = symbol$3, _b$2) {
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name142,
    message,
    cause
  }) {
    super(message);
    this[_a$3] = true;
    this.name = name142;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError.hasMarker(error, marker$3);
  }
  static hasMarker(error, marker152) {
    const markerSymbol = Symbol.for(marker152);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
};
var name$3 = "AI_APICallError";
var marker2$1 = `vercel.ai.error.${name$3}`;
var symbol2$1 = Symbol.for(marker2$1);
var _a2$1, _b2$1;
var APICallError = class extends (_b2$1 = AISDKError, _a2$1 = symbol2$1, _b2$1) {
  constructor({
    message,
    url,
    requestBodyValues,
    statusCode,
    responseHeaders,
    responseBody,
    cause,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500),
    // server error
    data
  }) {
    super({ name: name$3, message, cause });
    this[_a2$1] = true;
    this.url = url;
    this.requestBodyValues = requestBodyValues;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.responseBody = responseBody;
    this.isRetryable = isRetryable;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker2$1);
  }
};
var name2$1 = "AI_EmptyResponseBodyError";
var marker3$2 = `vercel.ai.error.${name2$1}`;
var symbol3$2 = Symbol.for(marker3$2);
var _a3$2, _b3$1;
var EmptyResponseBodyError = class extends (_b3$1 = AISDKError, _a3$2 = symbol3$2, _b3$1) {
  // used in isInstance
  constructor({ message = "Empty response body" } = {}) {
    super({ name: name2$1, message });
    this[_a3$2] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker3$2);
  }
};
function getErrorMessage$1(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
var name3$2 = "AI_InvalidArgumentError";
var marker4$2 = `vercel.ai.error.${name3$2}`;
var symbol4$2 = Symbol.for(marker4$2);
var _a4$2, _b4$1;
var InvalidArgumentError$1 = class InvalidArgumentError extends (_b4$1 = AISDKError, _a4$2 = symbol4$2, _b4$1) {
  constructor({
    message,
    cause,
    argument
  }) {
    super({ name: name3$2, message, cause });
    this[_a4$2] = true;
    this.argument = argument;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker4$2);
  }
};
var name4$2 = "AI_InvalidPromptError";
var marker5$2 = `vercel.ai.error.${name4$2}`;
var symbol5$2 = Symbol.for(marker5$2);
var _a5$2, _b5$1;
var InvalidPromptError = class extends (_b5$1 = AISDKError, _a5$2 = symbol5$2, _b5$1) {
  constructor({
    prompt,
    message,
    cause
  }) {
    super({ name: name4$2, message: `Invalid prompt: ${message}`, cause });
    this[_a5$2] = true;
    this.prompt = prompt;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker5$2);
  }
};
var name5$2 = "AI_InvalidResponseDataError";
var marker6$2 = `vercel.ai.error.${name5$2}`;
var symbol6$2 = Symbol.for(marker6$2);
var _a6$2, _b6$1;
var InvalidResponseDataError = class extends (_b6$1 = AISDKError, _a6$2 = symbol6$2, _b6$1) {
  constructor({
    data,
    message = `Invalid response data: ${JSON.stringify(data)}.`
  }) {
    super({ name: name5$2, message });
    this[_a6$2] = true;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker6$2);
  }
};
var name6$2 = "AI_JSONParseError";
var marker7$1 = `vercel.ai.error.${name6$2}`;
var symbol7$1 = Symbol.for(marker7$1);
var _a7$1, _b7$1;
var JSONParseError = class extends (_b7$1 = AISDKError, _a7$1 = symbol7$1, _b7$1) {
  constructor({ text: text2, cause }) {
    super({
      name: name6$2,
      message: `JSON parsing failed: Text: ${text2}.
Error message: ${getErrorMessage$1(cause)}`,
      cause
    });
    this[_a7$1] = true;
    this.text = text2;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker7$1);
  }
};
var name11 = "AI_TooManyEmbeddingValuesForCallError";
var marker12 = `vercel.ai.error.${name11}`;
var symbol12 = Symbol.for(marker12);
var _a12, _b12;
var TooManyEmbeddingValuesForCallError = class extends (_b12 = AISDKError, _a12 = symbol12, _b12) {
  constructor(options) {
    super({
      name: name11,
      message: `Too many values for a single embedding call. The ${options.provider} model "${options.modelId}" can only embed up to ${options.maxEmbeddingsPerCall} values per call, but ${options.values.length} values were provided.`
    });
    this[_a12] = true;
    this.provider = options.provider;
    this.modelId = options.modelId;
    this.maxEmbeddingsPerCall = options.maxEmbeddingsPerCall;
    this.values = options.values;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker12);
  }
};
var name12 = "AI_TypeValidationError";
var marker13$1 = `vercel.ai.error.${name12}`;
var symbol13$1 = Symbol.for(marker13$1);
var _a13$1, _b13;
var TypeValidationError = class _TypeValidationError extends (_b13 = AISDKError, _a13$1 = symbol13$1, _b13) {
  constructor({
    value,
    cause,
    context: context2
  }) {
    let contextPrefix = "Type validation failed";
    if (context2 == null ? void 0 : context2.field) {
      contextPrefix += ` for ${context2.field}`;
    }
    if ((context2 == null ? void 0 : context2.entityName) || (context2 == null ? void 0 : context2.entityId)) {
      contextPrefix += " (";
      const parts = [];
      if (context2.entityName) {
        parts.push(context2.entityName);
      }
      if (context2.entityId) {
        parts.push(`id: "${context2.entityId}"`);
      }
      contextPrefix += parts.join(", ");
      contextPrefix += ")";
    }
    super({
      name: name12,
      message: `${contextPrefix}: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage$1(cause)}`,
      cause
    });
    this[_a13$1] = true;
    this.value = value;
    this.context = context2;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker13$1);
  }
  /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value and context, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @param {TypeValidationContext} params.context - Optional context about what is being validated.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */
  static wrap({
    value,
    cause,
    context: context2
  }) {
    var _a152, _b15, _c;
    if (_TypeValidationError.isInstance(cause) && cause.value === value && ((_a152 = cause.context) == null ? void 0 : _a152.field) === (context2 == null ? void 0 : context2.field) && ((_b15 = cause.context) == null ? void 0 : _b15.entityName) === (context2 == null ? void 0 : context2.entityName) && ((_c = cause.context) == null ? void 0 : _c.entityId) === (context2 == null ? void 0 : context2.entityId)) {
      return cause;
    }
    return new _TypeValidationError({ value, cause, context: context2 });
  }
};
var name13$1 = "AI_UnsupportedFunctionalityError";
var marker14$1 = `vercel.ai.error.${name13$1}`;
var symbol14$1 = Symbol.for(marker14$1);
var _a14$1, _b14;
var UnsupportedFunctionalityError = class extends (_b14 = AISDKError, _a14$1 = symbol14$1, _b14) {
  constructor({
    functionality,
    message = `'${functionality}' functionality not supported.`
  }) {
    super({ name: name13$1, message });
    this[_a14$1] = true;
    this.functionality = functionality;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker14$1);
  }
};
function $constructor(name10, initializer2, params) {
  function init(inst, def) {
    var _a10;
    Object.defineProperty(inst, "_zod", {
      value: inst._zod ?? {},
      enumerable: false
    });
    (_a10 = inst._zod).traits ?? (_a10.traits = /* @__PURE__ */ new Set());
    inst._zod.traits.add(name10);
    initializer2(inst, def);
    for (const k in _.prototype) {
      if (!(k in inst))
        Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
    }
    inst._zod.constr = _;
    inst._zod.def = def;
  }
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name10 });
  function _(def) {
    var _a10;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a10 = inst._zod).deferred ?? (_a10.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name10);
    }
  });
  Object.defineProperty(_, "name", { value: name10 });
  return _;
}
class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}
const globalConfig = {};
function config(newConfig) {
  return globalConfig;
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  return {
    get value() {
      {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
    }
  };
}
function nullish(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder$1(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
function defineLazy(object2, key, getter) {
  Object.defineProperty(object2, key, {
    get() {
      {
        const value = getter();
        object2[key] = value;
        return value;
      }
    },
    set(v) {
      Object.defineProperty(object2, key, {
        value: v
        // configurable: true,
      });
    },
    configurable: true
  });
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function esc(str) {
  return JSON.stringify(str);
}
const captureStackTrace = Error.captureStackTrace ? Error.captureStackTrace : (..._args) => {
};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = cached(() => {
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
const propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== void 0) {
    if (params?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
const NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function pick(schema, mask) {
  const newShape = {};
  const currDef = schema._zod.def;
  for (const key in mask) {
    if (!(key in currDef.shape)) {
      throw new Error(`Unrecognized key: "${key}"`);
    }
    if (!mask[key])
      continue;
    newShape[key] = currDef.shape[key];
  }
  return clone(schema, {
    ...schema._zod.def,
    shape: newShape,
    checks: []
  });
}
function omit(schema, mask) {
  const newShape = { ...schema._zod.def.shape };
  const currDef = schema._zod.def;
  for (const key in mask) {
    if (!(key in currDef.shape)) {
      throw new Error(`Unrecognized key: "${key}"`);
    }
    if (!mask[key])
      continue;
    delete newShape[key];
  }
  return clone(schema, {
    ...schema._zod.def,
    shape: newShape,
    checks: []
  });
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const def = {
    ...schema._zod.def,
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    checks: []
    // delete existing checks
  };
  return clone(schema, def);
}
function merge(a, b) {
  return clone(a, {
    ...a._zod.def,
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    catchall: b._zod.def.catchall,
    checks: []
    // delete existing checks
  });
}
function partial(Class, schema, mask) {
  const oldShape = schema._zod.def.shape;
  const shape = { ...oldShape };
  if (mask) {
    for (const key in mask) {
      if (!(key in oldShape)) {
        throw new Error(`Unrecognized key: "${key}"`);
      }
      if (!mask[key])
        continue;
      shape[key] = Class ? new Class({
        type: "optional",
        innerType: oldShape[key]
      }) : oldShape[key];
    }
  } else {
    for (const key in oldShape) {
      shape[key] = Class ? new Class({
        type: "optional",
        innerType: oldShape[key]
      }) : oldShape[key];
    }
  }
  return clone(schema, {
    ...schema._zod.def,
    shape,
    checks: []
  });
}
function required(Class, schema, mask) {
  const oldShape = schema._zod.def.shape;
  const shape = { ...oldShape };
  if (mask) {
    for (const key in mask) {
      if (!(key in shape)) {
        throw new Error(`Unrecognized key: "${key}"`);
      }
      if (!mask[key])
        continue;
      shape[key] = new Class({
        type: "nonoptional",
        innerType: oldShape[key]
      });
    }
  } else {
    for (const key in oldShape) {
      shape[key] = new Class({
        type: "nonoptional",
        innerType: oldShape[key]
      });
    }
  }
  return clone(schema, {
    ...schema._zod.def,
    shape,
    // optional: [],
    checks: []
  });
}
function aborted(x, startIndex = 0) {
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true)
      return true;
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a10;
    (_a10 = iss).path ?? (_a10.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
const initializer$1 = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  Object.defineProperty(inst, "message", {
    get() {
      return JSON.stringify(def, jsonStringifyReplacer, 2);
    },
    enumerable: true
    // configurable: false,
  });
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, _mapper) {
  const mapper = _mapper || function(issue2) {
    return issue2.message;
  };
  const fieldErrors = { _errors: [] };
  const processError = (error2) => {
    for (const issue2 of error2.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}
const _parse$1 = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
const _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
const safeParse$1 = /* @__PURE__ */ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
const safeParseAsync$1 = /* @__PURE__ */ _safeParseAsync($ZodRealError);
const cuid = /^[cC][^\s-]{8,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
const uuid = (version2) => {
  if (!version2)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji$1, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^[A-Za-z0-9_-]*$/;
const hostname = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
const e164 = /^\+(?:[0-9]){6,14}[0-9]$/;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date$1 = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time$1(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
  const time2 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-]\\d{2}:\\d{2})`);
  const timeRegex2 = `${time2}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex2})$`);
}
const string$1 = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
const integer = /^\d+$/;
const number$1 = /^-?\d+(?:\.\d+)?/i;
const boolean$1 = /true|false/i;
const _null$2 = /null/i;
const lowercase = /^[^A-Z]*$/;
const uppercase = /^[^a-z]*$/;
const $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a10;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a10 = inst._zod).onattach ?? (_a10.onattach = []);
});
const numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
const $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a10;
    (_a10 = inst2._zod.bag).multipleOf ?? (_a10.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder$1(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inst
      });
    }
  };
});
const $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a10;
  $ZodCheck.init(inst, def);
  (_a10 = inst._zod.def).when ?? (_a10.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a10;
  $ZodCheck.init(inst, def);
  (_a10 = inst._zod.def).when ?? (_a10.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a10;
  $ZodCheck.init(inst, def);
  (_a10 = inst._zod.def).when ?? (_a10.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a10, _b9;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a10 = inst._zod).check ?? (_a10.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b9 = inst._zod).check ?? (_b9.check = () => {
    });
});
const $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});
class Doc {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split("\n").filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join("\n"));
  }
}
const version = {
  major: 4,
  minor: 0,
  patch: 0
};
const $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a10;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a10 = inst._zod).deferred ?? (_a10.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted2 = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted2) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError();
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted2)
              isAborted2 = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted2)
            isAborted2 = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    inst._zod.run = (payload, ctx) => {
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  inst["~standard"] = {
    validate: (value) => {
      try {
        const r = safeParse$1(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
});
const $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {
      }
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
const $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
const $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
const $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === void 0)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
const $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
const $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const orig = payload.value;
      const url = new URL(orig);
      const href = url.href;
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (!orig.endsWith("/") && href.endsWith("/")) {
        payload.value = href.slice(0, -1);
      } else {
        payload.value = href;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
const $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid);
  $ZodStringFormat.init(inst, def);
});
const $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
const $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
const $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime$1(def));
  $ZodStringFormat.init(inst, def);
});
const $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time$1(def));
  $ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = `ipv4`;
  });
});
const $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = `ipv6`;
  });
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
const $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const [address, prefix] = payload.value.split("/");
    try {
      if (!prefix)
        throw new Error();
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error();
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error();
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
const $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.contentEncoding = "base64";
  });
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base642.padEnd(Math.ceil(base642.length / 4) * 4, "=");
  return isValidBase64(padded);
}
const $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.contentEncoding = "base64url";
  });
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT$1(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
const $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT$1(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
const $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
const $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean$1;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null$2;
  inst._zod.values = /* @__PURE__ */ new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
const $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
const $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
const $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handleObjectResult(result, final, key) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(key, result.issues));
  }
  final.value[key] = result.value;
}
function handleOptionalObjectResult(result, final, key, input) {
  if (result.issues.length) {
    if (input[key] === void 0) {
      if (key in input) {
        final.value[key] = void 0;
      } else {
        final.value[key] = result.value;
      }
    } else {
      final.issues.push(...prefixIssues(key, result.issues));
    }
  } else if (result.value === void 0) {
    if (key in input)
      final.value[key] = void 0;
  } else {
    final.value[key] = result.value;
  }
}
const $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const _normalized = cached(() => {
    const keys = Object.keys(def.shape);
    for (const k of keys) {
      if (!(def.shape[k] instanceof $ZodType)) {
        throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
      }
    }
    const okeys = optionalKeys(def.shape);
    return {
      shape: def.shape,
      keys,
      keySet: new Set(keys),
      numKeys: keys.length,
      optionalKeys: new Set(okeys)
    };
  });
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = /* @__PURE__ */ Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {}`);
    for (const key of normalized.keys) {
      if (normalized.optionalKeys.has(key)) {
        const id = ids[key];
        doc.write(`const ${id} = ${parseStr(key)};`);
        const k = esc(key);
        doc.write(`
        if (${id}.issues.length) {
          if (input[${k}] === undefined) {
            if (${k} in input) {
              newResult[${k}] = undefined;
            }
          } else {
            payload.issues = payload.issues.concat(
              ${id}.issues.map((iss) => ({
                ...iss,
                path: iss.path ? [${k}, ...iss.path] : [${k}],
              }))
            );
          }
        } else if (${id}.value === undefined) {
          if (${k} in input) newResult[${k}] = undefined;
        } else {
          newResult[${k}] = ${id}.value;
        }
        `);
      } else {
        const id = ids[key];
        doc.write(`const ${id} = ${parseStr(key)};`);
        doc.write(`
          if (${id}.issues.length) payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${esc(key)}, ...iss.path] : [${esc(key)}]
          })));`);
        doc.write(`newResult[${esc(key)}] = ${id}.value`);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject$1 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval$1 = allowsEval;
  const fastEnabled = jit && allowsEval$1.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject$1(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
    } else {
      payload.value = {};
      const shape = value.shape;
      for (const key of value.keys) {
        const el = shape[key];
        const r = el._zod.run({ value: input[key], issues: [] }, ctx);
        const isOptional = el._zod.optin === "optional" && el._zod.optout === "optional";
        if (r instanceof Promise) {
          proms.push(r.then((r2) => isOptional ? handleOptionalObjectResult(r2, payload, key, input) : handleObjectResult(r2, payload, key)));
        } else if (isOptional) {
          handleOptionalObjectResult(r, payload, key, input);
        } else {
          handleObjectResult(r, payload, key);
        }
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    const unrecognized = [];
    const keySet = value.keySet;
    const _catchall = catchall._zod;
    const t = _catchall.def.type;
    for (const key of Object.keys(input)) {
      if (keySet.has(key))
        continue;
      if (t === "never") {
        unrecognized.push(key);
        continue;
      }
      const r = _catchall.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handleObjectResult(r2, payload, key)));
      } else {
        handleObjectResult(r, payload, key);
      }
    }
    if (unrecognized.length) {
      payload.issues.push({
        code: "unrecognized_keys",
        keys: unrecognized,
        input,
        inst
      });
    }
    if (!proms.length)
      return payload;
    return Promise.all(proms).then(() => {
      return payload;
    });
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
const $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
const $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = /* @__PURE__ */ new Set();
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map = /* @__PURE__ */ new Map();
    for (const o of opts) {
      const values = o._zod.propValues[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map.set(v, o);
      }
    }
    return map;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback) {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
const $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues$1(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues$1(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues$1(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  if (left.issues.length) {
    result.issues.push(...left.issues);
  }
  if (right.issues.length) {
    result.issues.push(...right.issues);
  }
  if (aborted(result))
    return result;
  const merged = mergeValues$1(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
const $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    if (def.keyType._zod.values) {
      const values = def.keyType._zod.values;
      payload.value = {};
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[key] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[key] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!values.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        if (keyResult.issues.length) {
          payload.issues.push({
            origin: "record",
            code: "invalid_key",
            issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
            input: key,
            path: [key],
            inst
          });
          payload.value[keyResult.value] = keyResult.value;
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
const $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  inst._zod.values = new Set(values);
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (inst._zod.values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
const $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.values = new Set(def.values);
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? o.toString() : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (inst._zod.values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
const $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const _out = def.transform(payload.value, payload);
    if (_ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError();
    }
    payload.value = _out;
    return payload;
  };
});
const $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) {
    payload.value = def.defaultValue;
  }
  return payload;
}
const $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleNonOptionalResult(result2, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
const $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.value;
        if (result2.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
const $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def, ctx));
    }
    return handlePipeResult(left, def, ctx);
  };
});
function handlePipeResult(left, def, ctx) {
  if (aborted(left)) {
    return left;
  }
  return def.out._zod.run({ value: left.value, issues: left.issues }, ctx);
}
const $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
const $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => def.getter());
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType._zod.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType._zod.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
const $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
class $ZodRegistry {
  constructor() {
    this._map = /* @__PURE__ */ new Map();
    this._idmap = /* @__PURE__ */ new Map();
  }
  add(schema, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      if (this._idmap.has(meta.id)) {
        throw new Error(`ID ${meta.id} already exists in the registry`);
      }
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = /* @__PURE__ */ new Map();
    this._idmap = /* @__PURE__ */ new Map();
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      return { ...pm, ...this._map.get(schema) };
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry();
}
const globalRegistry = /* @__PURE__ */ registry();
function _string(Class, params) {
  return new Class({
    type: "string",
    ...normalizeParams(params)
  });
}
function _email(Class, params) {
  return new Class({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class, params) {
  return new Class({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class, params) {
  return new Class({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji(Class, params) {
  return new Class({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class, params) {
  return new Class({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class, params) {
  return new Class({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class, params) {
  return new Class({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class, params) {
  return new Class({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class, params) {
  return new Class({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class, params) {
  return new Class({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class, params) {
  return new Class({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class, params) {
  return new Class({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class, params) {
  return new Class({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class, params) {
  return new Class({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class, params) {
  return new Class({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class, params) {
  return new Class({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _isoDateTime(Class, params) {
  return new Class({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class, params) {
  return new Class({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class, params) {
  return new Class({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class, params) {
  return new Class({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class, params) {
  return new Class({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
function _int(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _boolean(Class, params) {
  return new Class({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _null$1(Class, params) {
  return new Class({
    type: "null",
    ...normalizeParams(params)
  });
}
function _any(Class) {
  return new Class({
    type: "any"
  });
}
function _unknown(Class) {
  return new Class({
    type: "unknown"
  });
}
function _never(Class, params) {
  return new Class({
    type: "never",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _array(Class, element, params) {
  return new Class({
    type: "array",
    element,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params)
  });
}
function _custom(Class, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
function _refine(Class, fn, _params) {
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
class JSONSchemaGenerator {
  constructor(params) {
    this.counter = 0;
    this.metadataRegistry = params?.metadata ?? globalRegistry;
    this.target = params?.target ?? "draft-2020-12";
    this.unrepresentable = params?.unrepresentable ?? "throw";
    this.override = params?.override ?? (() => {
    });
    this.io = params?.io ?? "output";
    this.seen = /* @__PURE__ */ new Map();
  }
  process(schema, _params = { path: [], schemaPath: [] }) {
    var _a10;
    const def = schema._zod.def;
    const formatMap = {
      guid: "uuid",
      url: "uri",
      datetime: "date-time",
      json_string: "json-string",
      regex: ""
      // do not set
    };
    const seen = this.seen.get(schema);
    if (seen) {
      seen.count++;
      const isCycle = _params.schemaPath.includes(schema);
      if (isCycle) {
        seen.cycle = _params.path;
      }
      return seen.schema;
    }
    const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
    this.seen.set(schema, result);
    const overrideSchema = schema._zod.toJSONSchema?.();
    if (overrideSchema) {
      result.schema = overrideSchema;
    } else {
      const params = {
        ..._params,
        schemaPath: [..._params.schemaPath, schema],
        path: _params.path
      };
      const parent = schema._zod.parent;
      if (parent) {
        result.ref = parent;
        this.process(parent, params);
        this.seen.get(parent).isParent = true;
      } else {
        const _json = result.schema;
        switch (def.type) {
          case "string": {
            const json2 = _json;
            json2.type = "string";
            const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
            if (typeof minimum === "number")
              json2.minLength = minimum;
            if (typeof maximum === "number")
              json2.maxLength = maximum;
            if (format) {
              json2.format = formatMap[format] ?? format;
              if (json2.format === "")
                delete json2.format;
            }
            if (contentEncoding)
              json2.contentEncoding = contentEncoding;
            if (patterns && patterns.size > 0) {
              const regexes = [...patterns];
              if (regexes.length === 1)
                json2.pattern = regexes[0].source;
              else if (regexes.length > 1) {
                result.schema.allOf = [
                  ...regexes.map((regex) => ({
                    ...this.target === "draft-7" ? { type: "string" } : {},
                    pattern: regex.source
                  }))
                ];
              }
            }
            break;
          }
          case "number": {
            const json2 = _json;
            const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
            if (typeof format === "string" && format.includes("int"))
              json2.type = "integer";
            else
              json2.type = "number";
            if (typeof exclusiveMinimum === "number")
              json2.exclusiveMinimum = exclusiveMinimum;
            if (typeof minimum === "number") {
              json2.minimum = minimum;
              if (typeof exclusiveMinimum === "number") {
                if (exclusiveMinimum >= minimum)
                  delete json2.minimum;
                else
                  delete json2.exclusiveMinimum;
              }
            }
            if (typeof exclusiveMaximum === "number")
              json2.exclusiveMaximum = exclusiveMaximum;
            if (typeof maximum === "number") {
              json2.maximum = maximum;
              if (typeof exclusiveMaximum === "number") {
                if (exclusiveMaximum <= maximum)
                  delete json2.maximum;
                else
                  delete json2.exclusiveMaximum;
              }
            }
            if (typeof multipleOf === "number")
              json2.multipleOf = multipleOf;
            break;
          }
          case "boolean": {
            const json2 = _json;
            json2.type = "boolean";
            break;
          }
          case "bigint": {
            if (this.unrepresentable === "throw") {
              throw new Error("BigInt cannot be represented in JSON Schema");
            }
            break;
          }
          case "symbol": {
            if (this.unrepresentable === "throw") {
              throw new Error("Symbols cannot be represented in JSON Schema");
            }
            break;
          }
          case "null": {
            _json.type = "null";
            break;
          }
          case "any": {
            break;
          }
          case "unknown": {
            break;
          }
          case "undefined": {
            if (this.unrepresentable === "throw") {
              throw new Error("Undefined cannot be represented in JSON Schema");
            }
            break;
          }
          case "void": {
            if (this.unrepresentable === "throw") {
              throw new Error("Void cannot be represented in JSON Schema");
            }
            break;
          }
          case "never": {
            _json.not = {};
            break;
          }
          case "date": {
            if (this.unrepresentable === "throw") {
              throw new Error("Date cannot be represented in JSON Schema");
            }
            break;
          }
          case "array": {
            const json2 = _json;
            const { minimum, maximum } = schema._zod.bag;
            if (typeof minimum === "number")
              json2.minItems = minimum;
            if (typeof maximum === "number")
              json2.maxItems = maximum;
            json2.type = "array";
            json2.items = this.process(def.element, { ...params, path: [...params.path, "items"] });
            break;
          }
          case "object": {
            const json2 = _json;
            json2.type = "object";
            json2.properties = {};
            const shape = def.shape;
            for (const key in shape) {
              json2.properties[key] = this.process(shape[key], {
                ...params,
                path: [...params.path, "properties", key]
              });
            }
            const allKeys = new Set(Object.keys(shape));
            const requiredKeys = new Set([...allKeys].filter((key) => {
              const v = def.shape[key]._zod;
              if (this.io === "input") {
                return v.optin === void 0;
              } else {
                return v.optout === void 0;
              }
            }));
            if (requiredKeys.size > 0) {
              json2.required = Array.from(requiredKeys);
            }
            if (def.catchall?._zod.def.type === "never") {
              json2.additionalProperties = false;
            } else if (!def.catchall) {
              if (this.io === "output")
                json2.additionalProperties = false;
            } else if (def.catchall) {
              json2.additionalProperties = this.process(def.catchall, {
                ...params,
                path: [...params.path, "additionalProperties"]
              });
            }
            break;
          }
          case "union": {
            const json2 = _json;
            json2.anyOf = def.options.map((x, i) => this.process(x, {
              ...params,
              path: [...params.path, "anyOf", i]
            }));
            break;
          }
          case "intersection": {
            const json2 = _json;
            const a = this.process(def.left, {
              ...params,
              path: [...params.path, "allOf", 0]
            });
            const b = this.process(def.right, {
              ...params,
              path: [...params.path, "allOf", 1]
            });
            const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
            const allOf = [
              ...isSimpleIntersection(a) ? a.allOf : [a],
              ...isSimpleIntersection(b) ? b.allOf : [b]
            ];
            json2.allOf = allOf;
            break;
          }
          case "tuple": {
            const json2 = _json;
            json2.type = "array";
            const prefixItems = def.items.map((x, i) => this.process(x, { ...params, path: [...params.path, "prefixItems", i] }));
            if (this.target === "draft-2020-12") {
              json2.prefixItems = prefixItems;
            } else {
              json2.items = prefixItems;
            }
            if (def.rest) {
              const rest = this.process(def.rest, {
                ...params,
                path: [...params.path, "items"]
              });
              if (this.target === "draft-2020-12") {
                json2.items = rest;
              } else {
                json2.additionalItems = rest;
              }
            }
            if (def.rest) {
              json2.items = this.process(def.rest, {
                ...params,
                path: [...params.path, "items"]
              });
            }
            const { minimum, maximum } = schema._zod.bag;
            if (typeof minimum === "number")
              json2.minItems = minimum;
            if (typeof maximum === "number")
              json2.maxItems = maximum;
            break;
          }
          case "record": {
            const json2 = _json;
            json2.type = "object";
            json2.propertyNames = this.process(def.keyType, { ...params, path: [...params.path, "propertyNames"] });
            json2.additionalProperties = this.process(def.valueType, {
              ...params,
              path: [...params.path, "additionalProperties"]
            });
            break;
          }
          case "map": {
            if (this.unrepresentable === "throw") {
              throw new Error("Map cannot be represented in JSON Schema");
            }
            break;
          }
          case "set": {
            if (this.unrepresentable === "throw") {
              throw new Error("Set cannot be represented in JSON Schema");
            }
            break;
          }
          case "enum": {
            const json2 = _json;
            const values = getEnumValues(def.entries);
            if (values.every((v) => typeof v === "number"))
              json2.type = "number";
            if (values.every((v) => typeof v === "string"))
              json2.type = "string";
            json2.enum = values;
            break;
          }
          case "literal": {
            const json2 = _json;
            const vals = [];
            for (const val of def.values) {
              if (val === void 0) {
                if (this.unrepresentable === "throw") {
                  throw new Error("Literal `undefined` cannot be represented in JSON Schema");
                }
              } else if (typeof val === "bigint") {
                if (this.unrepresentable === "throw") {
                  throw new Error("BigInt literals cannot be represented in JSON Schema");
                } else {
                  vals.push(Number(val));
                }
              } else {
                vals.push(val);
              }
            }
            if (vals.length === 0) ;
            else if (vals.length === 1) {
              const val = vals[0];
              json2.type = val === null ? "null" : typeof val;
              json2.const = val;
            } else {
              if (vals.every((v) => typeof v === "number"))
                json2.type = "number";
              if (vals.every((v) => typeof v === "string"))
                json2.type = "string";
              if (vals.every((v) => typeof v === "boolean"))
                json2.type = "string";
              if (vals.every((v) => v === null))
                json2.type = "null";
              json2.enum = vals;
            }
            break;
          }
          case "file": {
            const json2 = _json;
            const file = {
              type: "string",
              format: "binary",
              contentEncoding: "binary"
            };
            const { minimum, maximum, mime } = schema._zod.bag;
            if (minimum !== void 0)
              file.minLength = minimum;
            if (maximum !== void 0)
              file.maxLength = maximum;
            if (mime) {
              if (mime.length === 1) {
                file.contentMediaType = mime[0];
                Object.assign(json2, file);
              } else {
                json2.anyOf = mime.map((m) => {
                  const mFile = { ...file, contentMediaType: m };
                  return mFile;
                });
              }
            } else {
              Object.assign(json2, file);
            }
            break;
          }
          case "transform": {
            if (this.unrepresentable === "throw") {
              throw new Error("Transforms cannot be represented in JSON Schema");
            }
            break;
          }
          case "nullable": {
            const inner = this.process(def.innerType, params);
            _json.anyOf = [inner, { type: "null" }];
            break;
          }
          case "nonoptional": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            break;
          }
          case "success": {
            const json2 = _json;
            json2.type = "boolean";
            break;
          }
          case "default": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            _json.default = JSON.parse(JSON.stringify(def.defaultValue));
            break;
          }
          case "prefault": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            if (this.io === "input")
              _json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
            break;
          }
          case "catch": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            let catchValue;
            try {
              catchValue = def.catchValue(void 0);
            } catch {
              throw new Error("Dynamic catch values are not supported in JSON Schema");
            }
            _json.default = catchValue;
            break;
          }
          case "nan": {
            if (this.unrepresentable === "throw") {
              throw new Error("NaN cannot be represented in JSON Schema");
            }
            break;
          }
          case "template_literal": {
            const json2 = _json;
            const pattern = schema._zod.pattern;
            if (!pattern)
              throw new Error("Pattern not found in template literal");
            json2.type = "string";
            json2.pattern = pattern.source;
            break;
          }
          case "pipe": {
            const innerType = this.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
            this.process(innerType, params);
            result.ref = innerType;
            break;
          }
          case "readonly": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            _json.readOnly = true;
            break;
          }
          // passthrough types
          case "promise": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            break;
          }
          case "optional": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            break;
          }
          case "lazy": {
            const innerType = schema._zod.innerType;
            this.process(innerType, params);
            result.ref = innerType;
            break;
          }
          case "custom": {
            if (this.unrepresentable === "throw") {
              throw new Error("Custom types cannot be represented in JSON Schema");
            }
            break;
          }
        }
      }
    }
    const meta = this.metadataRegistry.get(schema);
    if (meta)
      Object.assign(result.schema, meta);
    if (this.io === "input" && isTransforming(schema)) {
      delete result.schema.examples;
      delete result.schema.default;
    }
    if (this.io === "input" && result.schema._prefault)
      (_a10 = result.schema).default ?? (_a10.default = result.schema._prefault);
    delete result.schema._prefault;
    const _result = this.seen.get(schema);
    return _result.schema;
  }
  emit(schema, _params) {
    const params = {
      cycles: _params?.cycles ?? "ref",
      reused: _params?.reused ?? "inline",
      // unrepresentable: _params?.unrepresentable ?? "throw",
      // uri: _params?.uri ?? ((id) => `${id}`),
      external: _params?.external ?? void 0
    };
    const root = this.seen.get(schema);
    if (!root)
      throw new Error("Unprocessed schema. This is a bug in Zod.");
    const makeURI = (entry) => {
      const defsSegment = this.target === "draft-2020-12" ? "$defs" : "definitions";
      if (params.external) {
        const externalId = params.external.registry.get(entry[0])?.id;
        const uriGenerator = params.external.uri ?? ((id2) => id2);
        if (externalId) {
          return { ref: uriGenerator(externalId) };
        }
        const id = entry[1].defId ?? entry[1].schema.id ?? `schema${this.counter++}`;
        entry[1].defId = id;
        return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
      }
      if (entry[1] === root) {
        return { ref: "#" };
      }
      const uriPrefix = `#`;
      const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
      const defId = entry[1].schema.id ?? `__schema${this.counter++}`;
      return { defId, ref: defUriPrefix + defId };
    };
    const extractToDef = (entry) => {
      if (entry[1].schema.$ref) {
        return;
      }
      const seen = entry[1];
      const { ref, defId } = makeURI(entry);
      seen.def = { ...seen.schema };
      if (defId)
        seen.defId = defId;
      const schema2 = seen.schema;
      for (const key in schema2) {
        delete schema2[key];
      }
      schema2.$ref = ref;
    };
    if (params.cycles === "throw") {
      for (const entry of this.seen.entries()) {
        const seen = entry[1];
        if (seen.cycle) {
          throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
        }
      }
    }
    for (const entry of this.seen.entries()) {
      const seen = entry[1];
      if (schema === entry[0]) {
        extractToDef(entry);
        continue;
      }
      if (params.external) {
        const ext = params.external.registry.get(entry[0])?.id;
        if (schema !== entry[0] && ext) {
          extractToDef(entry);
          continue;
        }
      }
      const id = this.metadataRegistry.get(entry[0])?.id;
      if (id) {
        extractToDef(entry);
        continue;
      }
      if (seen.cycle) {
        extractToDef(entry);
        continue;
      }
      if (seen.count > 1) {
        if (params.reused === "ref") {
          extractToDef(entry);
          continue;
        }
      }
    }
    const flattenRef = (zodSchema2, params2) => {
      const seen = this.seen.get(zodSchema2);
      const schema2 = seen.def ?? seen.schema;
      const _cached = { ...schema2 };
      if (seen.ref === null) {
        return;
      }
      const ref = seen.ref;
      seen.ref = null;
      if (ref) {
        flattenRef(ref, params2);
        const refSchema = this.seen.get(ref).schema;
        if (refSchema.$ref && params2.target === "draft-7") {
          schema2.allOf = schema2.allOf ?? [];
          schema2.allOf.push(refSchema);
        } else {
          Object.assign(schema2, refSchema);
          Object.assign(schema2, _cached);
        }
      }
      if (!seen.isParent)
        this.override({
          zodSchema: zodSchema2,
          jsonSchema: schema2,
          path: seen.path ?? []
        });
    };
    for (const entry of [...this.seen.entries()].reverse()) {
      flattenRef(entry[0], { target: this.target });
    }
    const result = {};
    if (this.target === "draft-2020-12") {
      result.$schema = "https://json-schema.org/draft/2020-12/schema";
    } else if (this.target === "draft-7") {
      result.$schema = "http://json-schema.org/draft-07/schema#";
    } else {
      console.warn(`Invalid target: ${this.target}`);
    }
    if (params.external?.uri) {
      const id = params.external.registry.get(schema)?.id;
      if (!id)
        throw new Error("Schema is missing an `id` property");
      result.$id = params.external.uri(id);
    }
    Object.assign(result, root.def);
    const defs = params.external?.defs ?? {};
    for (const entry of this.seen.entries()) {
      const seen = entry[1];
      if (seen.def && seen.defId) {
        defs[seen.defId] = seen.def;
      }
    }
    if (params.external) ;
    else {
      if (Object.keys(defs).length > 0) {
        if (this.target === "draft-2020-12") {
          result.$defs = defs;
        } else {
          result.definitions = defs;
        }
      }
    }
    try {
      return JSON.parse(JSON.stringify(result));
    } catch (_err) {
      throw new Error("Error converting schema to JSON.");
    }
  }
}
function toJSONSchema(input, _params) {
  if (input instanceof $ZodRegistry) {
    const gen2 = new JSONSchemaGenerator(_params);
    const defs = {};
    for (const entry of input._idmap.entries()) {
      const [_, schema] = entry;
      gen2.process(schema);
    }
    const schemas = {};
    const external = {
      registry: input,
      uri: _params?.uri,
      defs
    };
    for (const entry of input._idmap.entries()) {
      const [key, schema] = entry;
      schemas[key] = gen2.emit(schema, {
        ..._params,
        external
      });
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = gen2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const gen = new JSONSchemaGenerator(_params);
  gen.process(input);
  return gen.emit(input, _params);
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const schema = _schema;
  const def = schema._zod.def;
  switch (def.type) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
    case "date":
    case "symbol":
    case "undefined":
    case "null":
    case "any":
    case "unknown":
    case "never":
    case "void":
    case "literal":
    case "enum":
    case "nan":
    case "file":
    case "template_literal":
      return false;
    case "array": {
      return isTransforming(def.element, ctx);
    }
    case "object": {
      for (const key in def.shape) {
        if (isTransforming(def.shape[key], ctx))
          return true;
      }
      return false;
    }
    case "union": {
      for (const option of def.options) {
        if (isTransforming(option, ctx))
          return true;
      }
      return false;
    }
    case "intersection": {
      return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
    }
    case "tuple": {
      for (const item of def.items) {
        if (isTransforming(item, ctx))
          return true;
      }
      if (def.rest && isTransforming(def.rest, ctx))
        return true;
      return false;
    }
    case "record": {
      return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    case "map": {
      return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    case "set": {
      return isTransforming(def.valueType, ctx);
    }
    // inner types
    case "promise":
    case "optional":
    case "nonoptional":
    case "nullable":
    case "readonly":
      return isTransforming(def.innerType, ctx);
    case "lazy":
      return isTransforming(def.getter(), ctx);
    case "default": {
      return isTransforming(def.innerType, ctx);
    }
    case "prefault": {
      return isTransforming(def.innerType, ctx);
    }
    case "custom": {
      return false;
    }
    case "transform": {
      return true;
    }
    case "pipe": {
      return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
    }
    case "success": {
      return false;
    }
    case "catch": {
      return false;
    }
  }
  throw new Error(`Unknown schema type: ${def.type}`);
}
const ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime(params) {
  return _isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date(params) {
  return _isoDate(ZodISODate, params);
}
const ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time(params) {
  return _isoTime(ZodISOTime, params);
}
const ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration(params) {
  return _isoDuration(ZodISODuration, params);
}
const initializer = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
      // enumerable: false,
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
      // enumerable: false,
    },
    addIssue: {
      value: (issue2) => inst.issues.push(issue2)
      // enumerable: false,
    },
    addIssues: {
      value: (issues2) => inst.issues.push(...issues2)
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
      // enumerable: false,
    }
  });
};
const ZodRealError = $constructor("ZodError", initializer, {
  Parent: Error
});
const parse = /* @__PURE__ */ _parse$1(ZodRealError);
const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
const ZodType$1 = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  inst.def = def;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks) => {
    return inst.clone(
      {
        ...def,
        checks: [
          ...def.checks ?? [],
          ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
        ]
      }
      // { parent: true }
    );
  };
  inst.clone = (def2, params) => clone(inst, def2, params);
  inst.brand = () => inst;
  inst.register = ((reg, meta) => {
    reg.add(inst, meta);
    return inst;
  });
  inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.refine = (check2, params) => inst.check(refine(check2, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array$1(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def2) => _default(inst, def2);
  inst.prefault = (def2) => prefault(inst, def2);
  inst.catch = (params) => _catch(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(void 0).success;
  inst.isNullable = () => inst.safeParse(null).success;
  return inst;
});
const _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType$1.init(inst, def);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
});
const ZodString$1 = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime(params));
  inst.date = (params) => inst.check(date(params));
  inst.time = (params) => inst.check(time(params));
  inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
  return _string(ZodString$1, params);
}
const ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
const ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodNumber$1 = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType$1.init(inst, def);
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number(params) {
  return _number(ZodNumber$1, params);
}
const ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber$1.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
const ZodBoolean$1 = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType$1.init(inst, def);
});
function boolean(params) {
  return _boolean(ZodBoolean$1, params);
}
const ZodNull$1 = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType$1.init(inst, def);
});
function _null(params) {
  return _null$1(ZodNull$1, params);
}
const ZodAny$1 = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType$1.init(inst, def);
});
function any() {
  return _any(ZodAny$1);
}
const ZodUnknown$1 = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType$1.init(inst, def);
});
function unknown() {
  return _unknown(ZodUnknown$1);
}
const ZodNever$1 = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType$1.init(inst, def);
});
function never(params) {
  return _never(ZodNever$1, params);
}
const ZodArray$1 = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType$1.init(inst, def);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array$1(element, params) {
  return _array(ZodArray$1, element, params);
}
const ZodObject$1 = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObject.init(inst, def);
  ZodType$1.init(inst, def);
  defineLazy(inst, "shape", () => def.shape);
  inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: void 0 });
  inst.extend = (incoming) => {
    return extend(inst, incoming);
  };
  inst.merge = (other) => merge(inst, other);
  inst.pick = (mask) => pick(inst, mask);
  inst.omit = (mask) => omit(inst, mask);
  inst.partial = (...args) => partial(ZodOptional$1, inst, args[0]);
  inst.required = (...args) => required(ZodNonOptional, inst, args[0]);
});
function object$1(shape, params) {
  const def = {
    type: "object",
    get shape() {
      assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    ...normalizeParams(params)
  };
  return new ZodObject$1(def);
}
function strictObject(shape, params) {
  return new ZodObject$1({
    type: "object",
    get shape() {
      assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    catchall: never(),
    ...normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject$1({
    type: "object",
    get shape() {
      assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    catchall: unknown(),
    ...normalizeParams(params)
  });
}
const ZodUnion$1 = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType$1.init(inst, def);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion$1({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
const ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion$1.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
const ZodIntersection$1 = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType$1.init(inst, def);
});
function intersection(left, right) {
  return new ZodIntersection$1({
    type: "intersection",
    left,
    right
  });
}
const ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType$1.init(inst, def);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
const ZodEnum$1 = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType$1.init(inst, def);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum$1({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum$1({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum$1({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
const ZodLiteral$1 = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType$1.init(inst, def);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral$1({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
const ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType$1.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.addIssue = (issue$1) => {
      if (typeof issue$1 === "string") {
        payload.issues.push(issue(issue$1, payload.value, def));
      } else {
        const _issue = issue$1;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        _issue.continue ?? (_issue.continue = true);
        payload.issues.push(issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
const ZodOptional$1 = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional$1({
    type: "optional",
    innerType
  });
}
const ZodNullable$1 = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable$1({
    type: "nullable",
    innerType
  });
}
const ZodDefault$1 = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
  return new ZodDefault$1({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
const ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
const ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
const ZodCatch$1 = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
  return new ZodCatch$1({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
const ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType$1.init(inst, def);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
const ZodReadonly$1 = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType$1.init(inst, def);
});
function readonly(innerType) {
  return new ZodReadonly$1({
    type: "readonly",
    innerType
  });
}
const ZodLazy$1 = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy$1({
    type: "lazy",
    getter
  });
}
const ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType$1.init(inst, def);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  const ch = check((payload) => {
    payload.addIssue = (issue$1) => {
      if (typeof issue$1 === "string") {
        payload.issues.push(issue(issue$1, payload.value, ch._zod.def));
      } else {
        const _issue = issue$1;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
function _instanceof(cls, params = {
  error: `Input not instance of ${cls.name}`
}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  return inst;
}
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object2) => {
    const keys = [];
    for (const key in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array2, separator = " | ") {
    return array2.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue2) {
      return issue2.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue2 of error.issues) {
        if (issue2.code === "invalid_union") {
          issue2.unionErrors.map(processError);
        } else if (issue2.code === "invalid_return_type") {
          processError(issue2.returnTypeError);
        } else if (issue2.code === "invalid_arguments") {
          processError(issue2.argumentsError);
        } else if (issue2.path.length === 0) {
          fieldErrors._errors.push(mapper(issue2));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue2.path.length) {
            const el = issue2.path[i];
            const terminal = i === issue2.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue2));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue2) => issue2.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue2, _ctx) => {
  let message;
  switch (issue2.code) {
    case ZodIssueCode.invalid_type:
      if (issue2.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue2.expected}, received ${issue2.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue2.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue2.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue2.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue2.options)}, received '${issue2.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue2.validation === "object") {
        if ("includes" in issue2.validation) {
          message = `Invalid input: must include "${issue2.validation.includes}"`;
          if (typeof issue2.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue2.validation.position}`;
          }
        } else if ("startsWith" in issue2.validation) {
          message = `Invalid input: must start with "${issue2.validation.startsWith}"`;
        } else if ("endsWith" in issue2.validation) {
          message = `Invalid input: must end with "${issue2.validation.endsWith}"`;
        } else {
          util.assertNever(issue2.validation);
        }
      } else if (issue2.validation !== "regex") {
        message = `Invalid ${issue2.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue2.type === "array")
        message = `Array must contain ${issue2.exact ? "exactly" : issue2.inclusive ? `at least` : `more than`} ${issue2.minimum} element(s)`;
      else if (issue2.type === "string")
        message = `String must contain ${issue2.exact ? "exactly" : issue2.inclusive ? `at least` : `over`} ${issue2.minimum} character(s)`;
      else if (issue2.type === "number")
        message = `Number must be ${issue2.exact ? `exactly equal to ` : issue2.inclusive ? `greater than or equal to ` : `greater than `}${issue2.minimum}`;
      else if (issue2.type === "bigint")
        message = `Number must be ${issue2.exact ? `exactly equal to ` : issue2.inclusive ? `greater than or equal to ` : `greater than `}${issue2.minimum}`;
      else if (issue2.type === "date")
        message = `Date must be ${issue2.exact ? `exactly equal to ` : issue2.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue2.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue2.type === "array")
        message = `Array must contain ${issue2.exact ? `exactly` : issue2.inclusive ? `at most` : `less than`} ${issue2.maximum} element(s)`;
      else if (issue2.type === "string")
        message = `String must contain ${issue2.exact ? `exactly` : issue2.inclusive ? `at most` : `under`} ${issue2.maximum} character(s)`;
      else if (issue2.type === "number")
        message = `Number must be ${issue2.exact ? `exactly` : issue2.inclusive ? `less than or equal to` : `less than`} ${issue2.maximum}`;
      else if (issue2.type === "bigint")
        message = `BigInt must be ${issue2.exact ? `exactly` : issue2.inclusive ? `less than or equal to` : `less than`} ${issue2.maximum}`;
      else if (issue2.type === "date")
        message = `Date must be ${issue2.exact ? `exactly` : issue2.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue2.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue2.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue2);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue2 = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue2);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check2, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check2(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check2, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check2(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform2) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform: transform2 }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex$1;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base642 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base642));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        if (input.data.length < check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check2.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        if (input.data.length > check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check2.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "length") {
        const tooBig = input.data.length > check2.value;
        const tooSmall = input.data.length < check2.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check2.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check2.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check2.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check2.message
            });
          }
          status.dirty();
        }
      } else if (check2.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "emoji") {
        if (!emojiRegex$1) {
          emojiRegex$1 = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "regex") {
        check2.regex.lastIndex = 0;
        const testResult = check2.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "trim") {
        input.data = input.data.trim();
      } else if (check2.kind === "includes") {
        if (!input.data.includes(check2.value, check2.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check2.value, position: check2.position },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check2.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check2.kind === "startsWith") {
        if (!input.data.startsWith(check2.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check2.value },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "endsWith") {
        if (!input.data.endsWith(check2.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check2.value },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "datetime") {
        const regex = datetimeRegex(check2);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "time") {
        const regex = timeRegex(check2);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "ip") {
        if (!isValidIP(input.data, check2.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "jwt") {
        if (!isValidJWT(input.data, check2.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cidr") {
        if (!isValidCidr(input.data, check2.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check2) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check2 of this._def.checks) {
      if (check2.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "min") {
        const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check2.value,
            type: "number",
            inclusive: check2.inclusive,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check2.value,
            type: "number",
            inclusive: check2.inclusive,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check2.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check2.value,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check2) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check2.value,
            inclusive: check2.inclusive,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check2.value,
            inclusive: check2.inclusive,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "multipleOf") {
        if (input.data % check2.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check2.value,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check2) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        if (input.data.getTime() < check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check2.message,
            inclusive: true,
            exact: false,
            minimum: check2.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        if (input.data.getTime() > check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check2.message,
            inclusive: true,
            exact: false,
            maximum: check2.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check2) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue2, ctx) => {
          const defaultError = this._def.errorMap?.(issue2, ctx).message ?? ctx.defaultError;
          if (issue2.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema2 = this._def.getter();
    return lazySchema2._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const stringType = ZodString.create;
const numberType = ZodNumber.create;
ZodBigInt.create;
ZodBoolean.create;
ZodDate.create;
ZodNever.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const unionType = ZodUnion.create;
ZodIntersection.create;
ZodTuple.create;
const enumType = ZodEnum.create;
ZodPromise.create;
ZodOptional.create;
ZodNullable.create;
const coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
class ParseError extends Error {
  constructor(message, options) {
    super(message), this.name = "ParseError", this.type = options.type, this.field = options.field, this.value = options.value, this.line = options.line;
  }
}
const LF = 10, CR = 13, SPACE = 32;
function noop(_arg) {
}
function createParser(callbacks) {
  if (typeof callbacks == "function")
    throw new TypeError(
      "`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?"
    );
  const { onEvent = noop, onError = noop, onRetry = noop, onComment } = callbacks, pendingFragments = [];
  let isFirstChunk = true, id, data = "", dataLines = 0, eventType;
  function feed(chunk) {
    if (isFirstChunk && (isFirstChunk = false, chunk.charCodeAt(0) === 239 && chunk.charCodeAt(1) === 187 && chunk.charCodeAt(2) === 191 && (chunk = chunk.slice(3))), pendingFragments.length === 0) {
      const trailing2 = processLines(chunk);
      trailing2 !== "" && pendingFragments.push(trailing2);
      return;
    }
    if (chunk.indexOf(`
`) === -1 && chunk.indexOf("\r") === -1) {
      pendingFragments.push(chunk);
      return;
    }
    pendingFragments.push(chunk);
    const input = pendingFragments.join("");
    pendingFragments.length = 0;
    const trailing = processLines(input);
    trailing !== "" && pendingFragments.push(trailing);
  }
  function processLines(chunk) {
    let searchIndex = 0;
    if (chunk.indexOf("\r") === -1) {
      let lfIndex = chunk.indexOf(`
`, searchIndex);
      for (; lfIndex !== -1; ) {
        if (searchIndex === lfIndex) {
          dataLines > 0 && onEvent({ id, event: eventType, data }), id = void 0, data = "", dataLines = 0, eventType = void 0, searchIndex = lfIndex + 1, lfIndex = chunk.indexOf(`
`, searchIndex);
          continue;
        }
        const firstCharCode = chunk.charCodeAt(searchIndex);
        if (isDataPrefix(chunk, searchIndex, firstCharCode)) {
          const valueStart = chunk.charCodeAt(searchIndex + 5) === SPACE ? searchIndex + 6 : searchIndex + 5, value = chunk.slice(valueStart, lfIndex);
          if (dataLines === 0 && chunk.charCodeAt(lfIndex + 1) === LF) {
            onEvent({ id, event: eventType, data: value }), id = void 0, data = "", eventType = void 0, searchIndex = lfIndex + 2, lfIndex = chunk.indexOf(`
`, searchIndex);
            continue;
          }
          data = dataLines === 0 ? value : `${data}
${value}`, dataLines++;
        } else isEventPrefix(chunk, searchIndex, firstCharCode) ? eventType = chunk.slice(
          chunk.charCodeAt(searchIndex + 6) === SPACE ? searchIndex + 7 : searchIndex + 6,
          lfIndex
        ) || void 0 : parseLine(chunk, searchIndex, lfIndex);
        searchIndex = lfIndex + 1, lfIndex = chunk.indexOf(`
`, searchIndex);
      }
      return chunk.slice(searchIndex);
    }
    for (; searchIndex < chunk.length; ) {
      const crIndex = chunk.indexOf("\r", searchIndex), lfIndex = chunk.indexOf(`
`, searchIndex);
      let lineEnd = -1;
      if (crIndex !== -1 && lfIndex !== -1 ? lineEnd = crIndex < lfIndex ? crIndex : lfIndex : crIndex !== -1 ? crIndex === chunk.length - 1 ? lineEnd = -1 : lineEnd = crIndex : lfIndex !== -1 && (lineEnd = lfIndex), lineEnd === -1)
        break;
      parseLine(chunk, searchIndex, lineEnd), searchIndex = lineEnd + 1, chunk.charCodeAt(searchIndex - 1) === CR && chunk.charCodeAt(searchIndex) === LF && searchIndex++;
    }
    return chunk.slice(searchIndex);
  }
  function parseLine(chunk, start, end) {
    if (start === end) {
      dispatchEvent();
      return;
    }
    const firstCharCode = chunk.charCodeAt(start);
    if (isDataPrefix(chunk, start, firstCharCode)) {
      const valueStart = chunk.charCodeAt(start + 5) === SPACE ? start + 6 : start + 5, value2 = chunk.slice(valueStart, end);
      data = dataLines === 0 ? value2 : `${data}
${value2}`, dataLines++;
      return;
    }
    if (isEventPrefix(chunk, start, firstCharCode)) {
      eventType = chunk.slice(chunk.charCodeAt(start + 6) === SPACE ? start + 7 : start + 6, end) || void 0;
      return;
    }
    if (firstCharCode === 105 && chunk.charCodeAt(start + 1) === 100 && chunk.charCodeAt(start + 2) === 58) {
      const value2 = chunk.slice(chunk.charCodeAt(start + 3) === SPACE ? start + 4 : start + 3, end);
      id = value2.includes("\0") ? void 0 : value2;
      return;
    }
    if (firstCharCode === 58) {
      if (onComment) {
        const line2 = chunk.slice(start, end);
        onComment(line2.slice(chunk.charCodeAt(start + 1) === SPACE ? 2 : 1));
      }
      return;
    }
    const line = chunk.slice(start, end), fieldSeparatorIndex = line.indexOf(":");
    if (fieldSeparatorIndex === -1) {
      processField(line, "", line);
      return;
    }
    const field = line.slice(0, fieldSeparatorIndex), offset = line.charCodeAt(fieldSeparatorIndex + 1) === SPACE ? 2 : 1, value = line.slice(fieldSeparatorIndex + offset);
    processField(field, value, line);
  }
  function processField(field, value, line) {
    switch (field) {
      case "event":
        eventType = value || void 0;
        break;
      case "data":
        data = dataLines === 0 ? value : `${data}
${value}`, dataLines++;
        break;
      case "id":
        id = value.includes("\0") ? void 0 : value;
        break;
      case "retry":
        /^\d+$/.test(value) ? onRetry(parseInt(value, 10)) : onError(
          new ParseError(`Invalid \`retry\` value: "${value}"`, {
            type: "invalid-retry",
            value,
            line
          })
        );
        break;
      default:
        onError(
          new ParseError(
            `Unknown field "${field.length > 20 ? `${field.slice(0, 20)}…` : field}"`,
            { type: "unknown-field", field, value, line }
          )
        );
        break;
    }
  }
  function dispatchEvent() {
    dataLines > 0 && onEvent({
      id,
      event: eventType,
      data
    }), id = void 0, data = "", dataLines = 0, eventType = void 0;
  }
  function reset(options = {}) {
    if (options.consume && pendingFragments.length > 0) {
      const incompleteLine = pendingFragments.join("");
      parseLine(incompleteLine, 0, incompleteLine.length);
    }
    isFirstChunk = true, id = void 0, data = "", dataLines = 0, eventType = void 0, pendingFragments.length = 0;
  }
  return { feed, reset };
}
function isDataPrefix(chunk, i, firstCharCode) {
  return firstCharCode === 100 && chunk.charCodeAt(i + 1) === 97 && chunk.charCodeAt(i + 2) === 116 && chunk.charCodeAt(i + 3) === 97 && chunk.charCodeAt(i + 4) === 58;
}
function isEventPrefix(chunk, i, firstCharCode) {
  return firstCharCode === 101 && chunk.charCodeAt(i + 1) === 118 && chunk.charCodeAt(i + 2) === 101 && chunk.charCodeAt(i + 3) === 110 && chunk.charCodeAt(i + 4) === 116 && chunk.charCodeAt(i + 5) === 58;
}
class EventSourceParserStream extends TransformStream {
  constructor({ onError, onRetry, onComment } = {}) {
    let parser;
    super({
      start(controller) {
        parser = createParser({
          onEvent: (event) => {
            controller.enqueue(event);
          },
          onError(error) {
            onError === "terminate" ? controller.error(error) : typeof onError == "function" && onError(error);
          },
          onRetry,
          onComment
        });
      },
      transform(chunk) {
        parser.feed(chunk);
      }
    });
  }
}
function combineHeaders(...headers) {
  return headers.reduce(
    (combinedHeaders, currentHeaders) => ({
      ...combinedHeaders,
      ...currentHeaders != null ? currentHeaders : {}
    }),
    {}
  );
}
async function delay(delayInMs, options) {
  if (delayInMs == null) {
    return Promise.resolve();
  }
  const signal = options == null ? void 0 : options.abortSignal;
  return new Promise((resolve2, reject) => {
    if (signal == null ? void 0 : signal.aborted) {
      reject(createAbortError());
      return;
    }
    const timeoutId = setTimeout(() => {
      cleanup();
      resolve2();
    }, delayInMs);
    const cleanup = () => {
      clearTimeout(timeoutId);
      signal == null ? void 0 : signal.removeEventListener("abort", onAbort);
    };
    const onAbort = () => {
      cleanup();
      reject(createAbortError());
    };
    signal == null ? void 0 : signal.addEventListener("abort", onAbort);
  });
}
function createAbortError() {
  return new DOMException("Delay was aborted", "AbortError");
}
var DelayedPromise = class {
  constructor() {
    this.status = { type: "pending" };
    this._resolve = void 0;
    this._reject = void 0;
  }
  get promise() {
    if (this._promise) {
      return this._promise;
    }
    this._promise = new Promise((resolve2, reject) => {
      if (this.status.type === "resolved") {
        resolve2(this.status.value);
      } else if (this.status.type === "rejected") {
        reject(this.status.error);
      }
      this._resolve = resolve2;
      this._reject = reject;
    });
    return this._promise;
  }
  resolve(value) {
    var _a22;
    this.status = { type: "resolved", value };
    if (this._promise) {
      (_a22 = this._resolve) == null ? void 0 : _a22.call(this, value);
    }
  }
  reject(error) {
    var _a22;
    this.status = { type: "rejected", error };
    if (this._promise) {
      (_a22 = this._reject) == null ? void 0 : _a22.call(this, error);
    }
  }
  isResolved() {
    return this.status.type === "resolved";
  }
  isRejected() {
    return this.status.type === "rejected";
  }
  isPending() {
    return this.status.type === "pending";
  }
};
function extractResponseHeaders(response) {
  return Object.fromEntries([...response.headers]);
}
var { btoa, atob: atob$1 } = globalThis;
function convertBase64ToUint8Array(base64String) {
  const base64Url = base64String.replace(/-/g, "+").replace(/_/g, "/");
  const latin1string = atob$1(base64Url);
  return Uint8Array.from(latin1string, (byte) => byte.codePointAt(0));
}
function convertUint8ArrayToBase64(array2) {
  let latin1string = "";
  for (let i = 0; i < array2.length; i++) {
    latin1string += String.fromCodePoint(array2[i]);
  }
  return btoa(latin1string);
}
function convertToBase64(value) {
  return value instanceof Uint8Array ? convertUint8ArrayToBase64(value) : value;
}
function convertToFormData(input, options = {}) {
  const { useArrayBrackets = true } = options;
  const formData = new FormData();
  for (const [key, value] of Object.entries(input)) {
    if (value == null) {
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length === 1) {
        formData.append(key, value[0]);
        continue;
      }
      const arrayKey = useArrayBrackets ? `${key}[]` : key;
      for (const item of value) {
        formData.append(arrayKey, item);
      }
      continue;
    }
    formData.append(key, value);
  }
  return formData;
}
var name$2 = "AI_DownloadError";
var marker$2 = `vercel.ai.error.${name$2}`;
var symbol$2 = Symbol.for(marker$2);
var _a$2, _b$1;
var DownloadError = class extends (_b$1 = AISDKError, _a$2 = symbol$2, _b$1) {
  constructor({
    url,
    statusCode,
    statusText,
    cause,
    message = cause == null ? `Failed to download ${url}: ${statusCode} ${statusText}` : `Failed to download ${url}: ${cause}`
  }) {
    super({ name: name$2, message, cause });
    this[_a$2] = true;
    this.url = url;
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker$2);
  }
};
var DEFAULT_MAX_DOWNLOAD_SIZE = 2 * 1024 * 1024 * 1024;
async function readResponseWithSizeLimit({
  response,
  url,
  maxBytes = DEFAULT_MAX_DOWNLOAD_SIZE
}) {
  const contentLength = response.headers.get("content-length");
  if (contentLength != null) {
    const length = parseInt(contentLength, 10);
    if (!isNaN(length) && length > maxBytes) {
      throw new DownloadError({
        url,
        message: `Download of ${url} exceeded maximum size of ${maxBytes} bytes (Content-Length: ${length}).`
      });
    }
  }
  const body = response.body;
  if (body == null) {
    return new Uint8Array(0);
  }
  const reader = body.getReader();
  const chunks = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      totalBytes += value.length;
      if (totalBytes > maxBytes) {
        throw new DownloadError({
          url,
          message: `Download of ${url} exceeded maximum size of ${maxBytes} bytes.`
        });
      }
      chunks.push(value);
    }
  } finally {
    try {
      await reader.cancel();
    } finally {
      reader.releaseLock();
    }
  }
  const result = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}
function validateDownloadUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch (e) {
    throw new DownloadError({
      url,
      message: `Invalid URL: ${url}`
    });
  }
  if (parsed.protocol === "data:") {
    return;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new DownloadError({
      url,
      message: `URL scheme must be http, https, or data, got ${parsed.protocol}`
    });
  }
  const hostname2 = parsed.hostname;
  if (!hostname2) {
    throw new DownloadError({
      url,
      message: `URL must have a hostname`
    });
  }
  if (hostname2 === "localhost" || hostname2.endsWith(".local") || hostname2.endsWith(".localhost")) {
    throw new DownloadError({
      url,
      message: `URL with hostname ${hostname2} is not allowed`
    });
  }
  if (hostname2.startsWith("[") && hostname2.endsWith("]")) {
    const ipv62 = hostname2.slice(1, -1);
    if (isPrivateIPv6(ipv62)) {
      throw new DownloadError({
        url,
        message: `URL with IPv6 address ${hostname2} is not allowed`
      });
    }
    return;
  }
  if (isIPv4(hostname2)) {
    if (isPrivateIPv4(hostname2)) {
      throw new DownloadError({
        url,
        message: `URL with IP address ${hostname2} is not allowed`
      });
    }
    return;
  }
}
function isIPv4(hostname2) {
  const parts = hostname2.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    const num = Number(part);
    return Number.isInteger(num) && num >= 0 && num <= 255 && String(num) === part;
  });
}
function isPrivateIPv4(ip) {
  const parts = ip.split(".").map(Number);
  const [a, b] = parts;
  if (a === 0) return true;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}
function isPrivateIPv6(ip) {
  const normalized = ip.toLowerCase();
  if (normalized === "::1") return true;
  if (normalized === "::") return true;
  if (normalized.startsWith("::ffff:")) {
    const mappedPart = normalized.slice(7);
    if (isIPv4(mappedPart)) {
      return isPrivateIPv4(mappedPart);
    }
    const hexParts = mappedPart.split(":");
    if (hexParts.length === 2) {
      const high = parseInt(hexParts[0], 16);
      const low = parseInt(hexParts[1], 16);
      if (!isNaN(high) && !isNaN(low)) {
        const a = high >> 8 & 255;
        const b = high & 255;
        const c = low >> 8 & 255;
        const d = low & 255;
        return isPrivateIPv4(`${a}.${b}.${c}.${d}`);
      }
    }
  }
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
  if (normalized.startsWith("fe80")) return true;
  return false;
}
async function downloadBlob(url, options) {
  var _a22, _b22;
  validateDownloadUrl(url);
  try {
    const response = await fetch(url, {
      signal: options == null ? void 0 : options.abortSignal
    });
    if (response.redirected) {
      validateDownloadUrl(response.url);
    }
    if (!response.ok) {
      throw new DownloadError({
        url,
        statusCode: response.status,
        statusText: response.statusText
      });
    }
    const data = await readResponseWithSizeLimit({
      response,
      url,
      maxBytes: (_a22 = options == null ? void 0 : options.maxBytes) != null ? _a22 : DEFAULT_MAX_DOWNLOAD_SIZE
    });
    const contentType = (_b22 = response.headers.get("content-type")) != null ? _b22 : void 0;
    return new Blob([data], contentType ? { type: contentType } : void 0);
  } catch (error) {
    if (DownloadError.isInstance(error)) {
      throw error;
    }
    throw new DownloadError({ url, cause: error });
  }
}
var createIdGenerator = ({
  prefix,
  size = 16,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator = "-"
} = {}) => {
  const generator = () => {
    const alphabetLength = alphabet.length;
    const chars = new Array(size);
    for (let i = 0; i < size; i++) {
      chars[i] = alphabet[Math.random() * alphabetLength | 0];
    }
    return chars.join("");
  };
  if (prefix == null) {
    return generator;
  }
  if (alphabet.includes(separator)) {
    throw new InvalidArgumentError$1({
      argument: "separator",
      message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
    });
  }
  return () => `${prefix}${separator}${generator()}`;
};
var generateId = createIdGenerator();
function getErrorMessage(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
function isAbortError(error) {
  return (error instanceof Error || error instanceof DOMException) && (error.name === "AbortError" || error.name === "ResponseAborted" || // Next.js
  error.name === "TimeoutError");
}
var FETCH_FAILED_ERROR_MESSAGES = ["fetch failed", "failed to fetch"];
var BUN_ERROR_CODES = [
  "ConnectionRefused",
  "ConnectionClosed",
  "FailedToOpenSocket",
  "ECONNRESET",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "EPIPE"
];
function isBunNetworkError(error) {
  if (!(error instanceof Error)) {
    return false;
  }
  const code = error.code;
  if (typeof code === "string" && BUN_ERROR_CODES.includes(code)) {
    return true;
  }
  return false;
}
function handleFetchError({
  error,
  url,
  requestBodyValues
}) {
  if (isAbortError(error)) {
    return error;
  }
  if (error instanceof TypeError && FETCH_FAILED_ERROR_MESSAGES.includes(error.message.toLowerCase())) {
    const cause = error.cause;
    if (cause != null) {
      return new APICallError({
        message: `Cannot connect to API: ${cause.message}`,
        cause,
        url,
        requestBodyValues,
        isRetryable: true
        // retry when network error
      });
    }
  }
  if (isBunNetworkError(error)) {
    return new APICallError({
      message: `Cannot connect to API: ${error.message}`,
      cause: error,
      url,
      requestBodyValues,
      isRetryable: true
    });
  }
  return error;
}
function getRuntimeEnvironmentUserAgent(globalThisAny = globalThis) {
  var _a22, _b22, _c;
  if (globalThisAny.window) {
    return `runtime/browser`;
  }
  if ((_a22 = globalThisAny.navigator) == null ? void 0 : _a22.userAgent) {
    return `runtime/${globalThisAny.navigator.userAgent.toLowerCase()}`;
  }
  if ((_c = (_b22 = globalThisAny.process) == null ? void 0 : _b22.versions) == null ? void 0 : _c.node) {
    return `runtime/node.js/${globalThisAny.process.version.substring(0)}`;
  }
  if (globalThisAny.EdgeRuntime) {
    return `runtime/vercel-edge`;
  }
  return "runtime/unknown";
}
function normalizeHeaders(headers) {
  if (headers == null) {
    return {};
  }
  const normalized = {};
  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      normalized[key.toLowerCase()] = value;
    });
  } else {
    if (!Array.isArray(headers)) {
      headers = Object.entries(headers);
    }
    for (const [key, value] of headers) {
      if (value != null) {
        normalized[key.toLowerCase()] = value;
      }
    }
  }
  return normalized;
}
function withUserAgentSuffix(headers, ...userAgentSuffixParts) {
  const normalizedHeaders = new Headers(normalizeHeaders(headers));
  const currentUserAgentHeader = normalizedHeaders.get("user-agent") || "";
  normalizedHeaders.set(
    "user-agent",
    [currentUserAgentHeader, ...userAgentSuffixParts].filter(Boolean).join(" ")
  );
  return Object.fromEntries(normalizedHeaders.entries());
}
var VERSION$4 = "4.0.27";
var getOriginalFetch = () => globalThis.fetch;
var getFromApi = async ({
  url,
  headers = {},
  successfulResponseHandler,
  failedResponseHandler,
  abortSignal,
  fetch: fetch2 = getOriginalFetch()
}) => {
  try {
    const response = await fetch2(url, {
      method: "GET",
      headers: withUserAgentSuffix(
        headers,
        `ai-sdk/provider-utils/${VERSION$4}`,
        getRuntimeEnvironmentUserAgent()
      ),
      signal: abortSignal
    });
    const responseHeaders = extractResponseHeaders(response);
    if (!response.ok) {
      let errorInformation;
      try {
        errorInformation = await failedResponseHandler({
          response,
          url,
          requestBodyValues: {}
        });
      } catch (error) {
        if (isAbortError(error) || APICallError.isInstance(error)) {
          throw error;
        }
        throw new APICallError({
          message: "Failed to process error response",
          cause: error,
          statusCode: response.status,
          url,
          responseHeaders,
          requestBodyValues: {}
        });
      }
      throw errorInformation.value;
    }
    try {
      return await successfulResponseHandler({
        response,
        url,
        requestBodyValues: {}
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAbortError(error) || APICallError.isInstance(error)) {
          throw error;
        }
      }
      throw new APICallError({
        message: "Failed to process successful response",
        cause: error,
        statusCode: response.status,
        url,
        responseHeaders,
        requestBodyValues: {}
      });
    }
  } catch (error) {
    throw handleFetchError({ error, url, requestBodyValues: {} });
  }
};
function isNonNullable(value) {
  return value != null;
}
function isUrlSupported({
  mediaType,
  url,
  supportedUrls
}) {
  url = url.toLowerCase();
  mediaType = mediaType.toLowerCase();
  return Object.entries(supportedUrls).map(([key, value]) => {
    const mediaType2 = key.toLowerCase();
    return mediaType2 === "*" || mediaType2 === "*/*" ? { mediaTypePrefix: "", regexes: value } : { mediaTypePrefix: mediaType2.replace(/\*/, ""), regexes: value };
  }).filter(({ mediaTypePrefix }) => mediaType.startsWith(mediaTypePrefix)).flatMap(({ regexes }) => regexes).some((pattern) => pattern.test(url));
}
function loadOptionalSetting({
  settingValue,
  environmentVariableName
}) {
  if (typeof settingValue === "string") {
    return settingValue;
  }
  if (settingValue != null || typeof process === "undefined") {
    return void 0;
  }
  settingValue = process.env[environmentVariableName];
  if (settingValue == null || typeof settingValue !== "string") {
    return void 0;
  }
  return settingValue;
}
var suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function _parse(text2) {
  const obj = JSON.parse(text2);
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (suspectProtoRx.test(text2) === false && suspectConstructorRx.test(text2) === false) {
    return obj;
  }
  return filter(obj);
}
function filter(obj) {
  let next = [obj];
  while (next.length) {
    const nodes = next;
    next = [];
    for (const node of nodes) {
      if (Object.prototype.hasOwnProperty.call(node, "__proto__")) {
        throw new SyntaxError("Object contains forbidden prototype property");
      }
      if (Object.prototype.hasOwnProperty.call(node, "constructor") && node.constructor !== null && typeof node.constructor === "object" && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
        throw new SyntaxError("Object contains forbidden prototype property");
      }
      for (const key in node) {
        const value = node[key];
        if (value && typeof value === "object") {
          next.push(value);
        }
      }
    }
  }
  return obj;
}
function secureJsonParse(text2) {
  const { stackTraceLimit } = Error;
  try {
    Error.stackTraceLimit = 0;
  } catch (e) {
    return _parse(text2);
  }
  try {
    return _parse(text2);
  } finally {
    Error.stackTraceLimit = stackTraceLimit;
  }
}
function addAdditionalPropertiesToJsonSchema(jsonSchema2) {
  if (jsonSchema2.type === "object" || Array.isArray(jsonSchema2.type) && jsonSchema2.type.includes("object")) {
    jsonSchema2.additionalProperties = false;
    const { properties } = jsonSchema2;
    if (properties != null) {
      for (const key of Object.keys(properties)) {
        properties[key] = visit(properties[key]);
      }
    }
  }
  if (jsonSchema2.items != null) {
    jsonSchema2.items = Array.isArray(jsonSchema2.items) ? jsonSchema2.items.map(visit) : visit(jsonSchema2.items);
  }
  if (jsonSchema2.anyOf != null) {
    jsonSchema2.anyOf = jsonSchema2.anyOf.map(visit);
  }
  if (jsonSchema2.allOf != null) {
    jsonSchema2.allOf = jsonSchema2.allOf.map(visit);
  }
  if (jsonSchema2.oneOf != null) {
    jsonSchema2.oneOf = jsonSchema2.oneOf.map(visit);
  }
  const { definitions } = jsonSchema2;
  if (definitions != null) {
    for (const key of Object.keys(definitions)) {
      definitions[key] = visit(definitions[key]);
    }
  }
  return jsonSchema2;
}
function visit(def) {
  if (typeof def === "boolean") return def;
  return addAdditionalPropertiesToJsonSchema(def);
}
var ignoreOverride = /* @__PURE__ */ Symbol(
  "Let zodToJsonSchema decide on which parser to use"
);
var defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: true,
  rejectedAdditionalProperties: false,
  definitionPath: "definitions",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};
function parseAnyDef() {
  return {};
}
function parseArrayDef(def, refs) {
  var _a22, _b22, _c;
  const res = {
    type: "array"
  };
  if (((_a22 = def.type) == null ? void 0 : _a22._def) && ((_c = (_b22 = def.type) == null ? void 0 : _b22._def) == null ? void 0 : _c.typeName) !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    res.minItems = def.minLength.value;
  }
  if (def.maxLength) {
    res.maxItems = def.maxLength.value;
  }
  if (def.exactLength) {
    res.minItems = def.exactLength.value;
    res.maxItems = def.exactLength.value;
  }
  return res;
}
function parseBigintDef(def) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks) return res;
  for (const check2 of def.checks) {
    switch (check2.kind) {
      case "min":
        if (check2.inclusive) {
          res.minimum = check2.value;
        } else {
          res.exclusiveMinimum = check2.value;
        }
        break;
      case "max":
        if (check2.inclusive) {
          res.maximum = check2.value;
        } else {
          res.exclusiveMaximum = check2.value;
        }
        break;
      case "multipleOf":
        res.multipleOf = check2.value;
        break;
    }
  }
  return res;
}
function parseBooleanDef() {
  return { type: "boolean" };
}
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}
var parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy != null ? overrideDateStrategy : refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def);
  }
}
var integerDateParser = (def) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  for (const check2 of def.checks) {
    switch (check2.kind) {
      case "min":
        res.minimum = check2.value;
        break;
      case "max":
        res.maximum = check2.value;
        break;
    }
  }
  return res;
};
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : parseAnyDef();
}
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}
var isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string") return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? { allOf: mergedAllOf } : void 0;
}
function parseLiteralDef(def) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}
var emojiRegex = void 0;
var zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => {
    if (emojiRegex === void 0) {
      emojiRegex = RegExp(
        "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
        "u"
      );
    }
    return emojiRegex;
  },
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check2 of def.checks) {
      switch (check2.kind) {
        case "min":
          res.minLength = typeof res.minLength === "number" ? Math.max(res.minLength, check2.value) : check2.value;
          break;
        case "max":
          res.maxLength = typeof res.maxLength === "number" ? Math.min(res.maxLength, check2.value) : check2.value;
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check2.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check2.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check2.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check2.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check2.message, refs);
          break;
        case "regex":
          addPattern(res, check2.regex, check2.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check2.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check2.message, refs);
          break;
        case "startsWith":
          addPattern(
            res,
            RegExp(`^${escapeLiteralCheckValue(check2.value, refs)}`),
            check2.message,
            refs
          );
          break;
        case "endsWith":
          addPattern(
            res,
            RegExp(`${escapeLiteralCheckValue(check2.value, refs)}$`),
            check2.message,
            refs
          );
          break;
        case "datetime":
          addFormat(res, "date-time", check2.message, refs);
          break;
        case "date":
          addFormat(res, "date", check2.message, refs);
          break;
        case "time":
          addFormat(res, "time", check2.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check2.message, refs);
          break;
        case "length":
          res.minLength = typeof res.minLength === "number" ? Math.max(res.minLength, check2.value) : check2.value;
          res.maxLength = typeof res.maxLength === "number" ? Math.min(res.maxLength, check2.value) : check2.value;
          break;
        case "includes": {
          addPattern(
            res,
            RegExp(escapeLiteralCheckValue(check2.value, refs)),
            check2.message,
            refs
          );
          break;
        }
        case "ip": {
          if (check2.version !== "v6") {
            addFormat(res, "ipv4", check2.message, refs);
          }
          if (check2.version !== "v4") {
            addFormat(res, "ipv6", check2.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check2.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check2.message, refs);
          break;
        case "cidr": {
          if (check2.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check2.message, refs);
          }
          if (check2.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check2.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check2.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check2.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check2.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              res.contentEncoding = "base64";
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check2.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check2.message, refs);
        }
      }
    }
  }
  return res;
}
function escapeLiteralCheckValue(literal2, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal2) : literal2;
}
var ALPHA_NUMERIC = new Set(
  "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789"
);
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i = 0; i < source.length; i++) {
    if (!ALPHA_NUMERIC.has(source[i])) {
      result += "\\";
    }
    result += source[i];
  }
  return result;
}
function addFormat(schema, value, message, refs) {
  var _a22;
  if (schema.format || ((_a22 = schema.anyOf) == null ? void 0 : _a22.some((x) => x.format))) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format
      });
      delete schema.format;
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    schema.format = value;
  }
}
function addPattern(schema, regex, message, refs) {
  var _a22;
  if (schema.pattern || ((_a22 = schema.allOf) == null ? void 0 : _a22.some((x) => x.pattern))) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern
      });
      delete schema.pattern;
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    schema.pattern = stringifyRegExpWithFlags(regex, refs);
  }
}
function stringifyRegExpWithFlags(regex, refs) {
  var _a22;
  if (!refs.applyRegexFlags || !regex.flags) {
    return regex.source;
  }
  const flags = {
    i: regex.flags.includes("i"),
    // Case-insensitive
    m: regex.flags.includes("m"),
    // `^` and `$` matches adjacent to newline characters
    s: regex.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && ((_a22 = source[i + 2]) == null ? void 0 : _a22.match(/[a-z]/))) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    new RegExp(pattern);
  } catch (e) {
    console.warn(
      `Could not convert regex pattern at ${refs.currentPath.join(
        "/"
      )} to a flag-independent form! Falling back to the flag-ignorant source`
    );
    return regex.source;
  }
  return pattern;
}
function parseRecordDef(def, refs) {
  var _a22, _b22, _c, _d, _e, _f;
  const schema = {
    type: "object",
    additionalProperties: (_a22 = parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    })) != null ? _a22 : refs.allowedAdditionalProperties
  };
  if (((_b22 = def.keyType) == null ? void 0 : _b22._def.typeName) === ZodFirstPartyTypeKind.ZodString && ((_c = def.keyType._def.checks) == null ? void 0 : _c.length)) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (((_d = def.keyType) == null ? void 0 : _d._def.typeName) === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (((_e = def.keyType) == null ? void 0 : _e._def.typeName) === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && ((_f = def.keyType._def.type._def.checks) == null ? void 0 : _f.length)) {
    const { type, ...keyType } = parseBrandedDef(
      def.keyType._def,
      refs
    );
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || parseAnyDef();
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || parseAnyDef();
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}
function parseNativeEnumDef(def) {
  const object2 = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object2[object2[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object2[key]);
  const parsedTypes = Array.from(
    new Set(actualValues.map((values) => typeof values))
  );
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}
function parseNeverDef() {
  return { not: parseAnyDef() };
}
function parseNullDef() {
  return {
    type: "null"
  };
}
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every(
    (x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length)
  )) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce(
      (acc, x) => {
        const type = typeof x._def.value;
        switch (type) {
          case "string":
          case "number":
          case "boolean":
            return [...acc, type];
          case "bigint":
            return [...acc, "integer"];
          case "object":
            if (x._def.value === null) return [...acc, "null"];
          case "symbol":
          case "undefined":
          case "function":
          default:
            return acc;
        }
      },
      []
    );
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce(
          (acc, x) => {
            return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
          },
          []
        )
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce(
        (acc, x) => [
          ...acc,
          ...x._def.values.filter((x2) => !acc.includes(x2))
        ],
        []
      )
    };
  }
  return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map(
    (x, i) => parseDef(x._def, {
      ...refs,
      currentPath: [...refs.currentPath, "anyOf", `${i}`]
    })
  ).filter(
    (x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0)
  );
  return anyOf.length ? { anyOf } : void 0;
};
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(
    def.innerType._def.typeName
  ) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}
function parseNumberDef(def) {
  const res = {
    type: "number"
  };
  if (!def.checks) return res;
  for (const check2 of def.checks) {
    switch (check2.kind) {
      case "int":
        res.type = "integer";
        break;
      case "min":
        if (check2.inclusive) {
          res.minimum = check2.value;
        } else {
          res.exclusiveMinimum = check2.value;
        }
        break;
      case "max":
        if (check2.inclusive) {
          res.maximum = check2.value;
        } else {
          res.exclusiveMaximum = check2.value;
        }
        break;
      case "multipleOf":
        res.multipleOf = check2.value;
        break;
    }
  }
  return res;
}
function parseObjectDef(def, refs) {
  const result = {
    type: "object",
    properties: {}
  };
  const required2 = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === void 0 || propDef._def === void 0) {
      continue;
    }
    const propOptional = safeIsOptional(propDef);
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === void 0) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required2.push(propName);
    }
  }
  if (required2.length) {
    result.required = required2;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== void 0) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch (e) {
    return true;
  }
}
var parseOptionalDef = (def, refs) => {
  var _a22;
  if (refs.currentPath.toString() === ((_a22 = refs.propertyPath) == null ? void 0 : _a22.toString())) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? { anyOf: [{ not: parseAnyDef() }, innerSchema] } : parseAnyDef();
};
var parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== void 0)
  };
};
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    schema.minItems = def.minSize.value;
  }
  if (def.maxSize) {
    schema.maxItems = def.maxSize.value;
  }
  return schema;
}
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map(
        (x, i) => parseDef(x._def, {
          ...refs,
          currentPath: [...refs.currentPath, "items", `${i}`]
        })
      ).reduce(
        (acc, x) => x === void 0 ? acc : [...acc, x],
        []
      ),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map(
        (x, i) => parseDef(x._def, {
          ...refs,
          currentPath: [...refs.currentPath, "items", `${i}`]
        })
      ).reduce(
        (acc, x) => x === void 0 ? acc : [...acc, x],
        []
      )
    };
  }
}
function parseUndefinedDef() {
  return {
    not: parseAnyDef()
  };
}
function parseUnknownDef() {
  return parseAnyDef();
}
var parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};
var selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef();
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return () => def.getter()._def;
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_) => void 0)();
  }
};
var getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i]) break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
function parseDef(def, refs, forceResolution = false) {
  var _a22;
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = (_a22 = refs.override) == null ? void 0 : _a22.call(
      refs,
      def,
      refs,
      seenItem,
      forceResolution
    );
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema2 = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema2) {
    addMeta(def, refs, jsonSchema2);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema2, def, refs);
    newItem.jsonSchema = jsonSchema2;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema2;
  return jsonSchema2;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(
          `Recursive reference detected at ${refs.currentPath.join(
            "/"
          )}! Defaulting to any`
        );
        return parseAnyDef();
      }
      return refs.$refStrategy === "seen" ? parseAnyDef() : void 0;
    }
  }
};
var addMeta = (def, refs, jsonSchema2) => {
  if (def.description) {
    jsonSchema2.description = def.description;
  }
  return jsonSchema2;
};
var getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: void 0,
    seen: new Map(
      Object.entries(_options.definitions).map(([name22, def]) => [
        def._def,
        {
          def: def._def,
          path: [..._options.basePath, _options.definitionPath, name22],
          // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
          jsonSchema: void 0
        }
      ])
    )
  };
};
var zod3ToJsonSchema = (schema, options) => {
  var _a22;
  const refs = getRefs(options);
  let definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce(
    (acc, [name32, schema2]) => {
      var _a32;
      return {
        ...acc,
        [name32]: (_a32 = parseDef(
          schema2._def,
          {
            ...refs,
            currentPath: [...refs.basePath, refs.definitionPath, name32]
          },
          true
        )) != null ? _a32 : parseAnyDef()
      };
    },
    {}
  ) : void 0;
  const name22 = typeof options === "string" ? options : (options == null ? void 0 : options.nameStrategy) === "title" ? void 0 : options == null ? void 0 : options.name;
  const main = (_a22 = parseDef(
    schema._def,
    name22 === void 0 ? refs : {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name22]
    },
    false
  )) != null ? _a22 : parseAnyDef();
  const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  if (title !== void 0) {
    main.title = title;
  }
  const combined = name22 === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name22
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name22]: main
    }
  };
  combined.$schema = "http://json-schema.org/draft-07/schema#";
  return combined;
};
var schemaSymbol = /* @__PURE__ */ Symbol.for("vercel.ai.schema");
function lazySchema(createSchema) {
  let schema;
  return () => {
    if (schema == null) {
      schema = createSchema();
    }
    return schema;
  };
}
function jsonSchema(jsonSchema2, {
  validate
} = {}) {
  return {
    [schemaSymbol]: true,
    _type: void 0,
    // should never be used directly
    get jsonSchema() {
      if (typeof jsonSchema2 === "function") {
        jsonSchema2 = jsonSchema2();
      }
      return jsonSchema2;
    },
    validate
  };
}
function isSchema(value) {
  return typeof value === "object" && value !== null && schemaSymbol in value && value[schemaSymbol] === true && "jsonSchema" in value && "validate" in value;
}
function asSchema(schema) {
  return schema == null ? jsonSchema({ properties: {}, additionalProperties: false }) : isSchema(schema) ? schema : "~standard" in schema ? schema["~standard"].vendor === "zod" ? zodSchema(schema) : standardSchema(schema) : schema();
}
function standardSchema(standardSchema2) {
  return jsonSchema(
    () => addAdditionalPropertiesToJsonSchema(
      standardSchema2["~standard"].jsonSchema.input({
        target: "draft-07"
      })
    ),
    {
      validate: async (value) => {
        const result = await standardSchema2["~standard"].validate(value);
        return "value" in result ? { success: true, value: result.value } : {
          success: false,
          error: new TypeValidationError({
            value,
            cause: result.issues
          })
        };
      }
    }
  );
}
function zod3Schema(zodSchema2, options) {
  var _a22;
  const useReferences = (_a22 = void 0) != null ? _a22 : false;
  return jsonSchema(
    // defer json schema creation to avoid unnecessary computation when only validation is needed
    () => zod3ToJsonSchema(zodSchema2, {
      $refStrategy: useReferences ? "root" : "none"
    }),
    {
      validate: async (value) => {
        const result = await zodSchema2.safeParseAsync(value);
        return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
      }
    }
  );
}
function zod4Schema(zodSchema2, options) {
  var _a22;
  const useReferences = (_a22 = void 0) != null ? _a22 : false;
  return jsonSchema(
    // defer json schema creation to avoid unnecessary computation when only validation is needed
    () => addAdditionalPropertiesToJsonSchema(
      toJSONSchema(zodSchema2, {
        target: "draft-7",
        io: "input",
        reused: useReferences ? "ref" : "inline"
      })
    ),
    {
      validate: async (value) => {
        const result = await safeParseAsync(zodSchema2, value);
        return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
      }
    }
  );
}
function isZod4Schema(zodSchema2) {
  return "_zod" in zodSchema2;
}
function zodSchema(zodSchema2, options) {
  if (isZod4Schema(zodSchema2)) {
    return zod4Schema(zodSchema2);
  } else {
    return zod3Schema(zodSchema2);
  }
}
async function validateTypes({
  value,
  schema,
  context: context2
}) {
  const result = await safeValidateTypes({ value, schema, context: context2 });
  if (!result.success) {
    throw TypeValidationError.wrap({ value, cause: result.error, context: context2 });
  }
  return result.value;
}
async function safeValidateTypes({
  value,
  schema,
  context: context2
}) {
  const actualSchema = asSchema(schema);
  try {
    if (actualSchema.validate == null) {
      return { success: true, value, rawValue: value };
    }
    const result = await actualSchema.validate(value);
    if (result.success) {
      return { success: true, value: result.value, rawValue: value };
    }
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: result.error, context: context2 }),
      rawValue: value
    };
  } catch (error) {
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: error, context: context2 }),
      rawValue: value
    };
  }
}
async function parseJSON({
  text: text2,
  schema
}) {
  try {
    const value = secureJsonParse(text2);
    if (schema == null) {
      return value;
    }
    return validateTypes({ value, schema });
  } catch (error) {
    if (JSONParseError.isInstance(error) || TypeValidationError.isInstance(error)) {
      throw error;
    }
    throw new JSONParseError({ text: text2, cause: error });
  }
}
async function safeParseJSON({
  text: text2,
  schema
}) {
  try {
    const value = secureJsonParse(text2);
    if (schema == null) {
      return { success: true, value, rawValue: value };
    }
    return await safeValidateTypes({ value, schema });
  } catch (error) {
    return {
      success: false,
      error: JSONParseError.isInstance(error) ? error : new JSONParseError({ text: text2, cause: error }),
      rawValue: void 0
    };
  }
}
function isParsableJson(input) {
  try {
    secureJsonParse(input);
    return true;
  } catch (e) {
    return false;
  }
}
function parseJsonEventStream({
  stream,
  schema
}) {
  return stream.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).pipeThrough(
    new TransformStream({
      async transform({ data }, controller) {
        if (data === "[DONE]") {
          return;
        }
        controller.enqueue(await safeParseJSON({ text: data, schema }));
      }
    })
  );
}
async function parseProviderOptions({
  provider,
  providerOptions,
  schema
}) {
  if ((providerOptions == null ? void 0 : providerOptions[provider]) == null) {
    return void 0;
  }
  const parsedProviderOptions = await safeValidateTypes({
    value: providerOptions[provider],
    schema
  });
  if (!parsedProviderOptions.success) {
    throw new InvalidArgumentError$1({
      argument: "providerOptions",
      message: `invalid ${provider} provider options`,
      cause: parsedProviderOptions.error
    });
  }
  return parsedProviderOptions.value;
}
var getOriginalFetch2 = () => globalThis.fetch;
var postJsonToApi = async ({
  url,
  headers,
  body,
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch: fetch2
}) => postToApi({
  url,
  headers: {
    "Content-Type": "application/json",
    ...headers
  },
  body: {
    content: JSON.stringify(body),
    values: body
  },
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch: fetch2
});
var postFormDataToApi = async ({
  url,
  headers,
  formData,
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch: fetch2
}) => postToApi({
  url,
  headers,
  body: {
    content: formData,
    values: Object.fromEntries(formData.entries())
  },
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch: fetch2
});
var postToApi = async ({
  url,
  headers = {},
  body,
  successfulResponseHandler,
  failedResponseHandler,
  abortSignal,
  fetch: fetch2 = getOriginalFetch2()
}) => {
  try {
    const response = await fetch2(url, {
      method: "POST",
      headers: withUserAgentSuffix(
        headers,
        `ai-sdk/provider-utils/${VERSION$4}`,
        getRuntimeEnvironmentUserAgent()
      ),
      body: body.content,
      signal: abortSignal
    });
    const responseHeaders = extractResponseHeaders(response);
    if (!response.ok) {
      let errorInformation;
      try {
        errorInformation = await failedResponseHandler({
          response,
          url,
          requestBodyValues: body.values
        });
      } catch (error) {
        if (isAbortError(error) || APICallError.isInstance(error)) {
          throw error;
        }
        throw new APICallError({
          message: "Failed to process error response",
          cause: error,
          statusCode: response.status,
          url,
          responseHeaders,
          requestBodyValues: body.values
        });
      }
      throw errorInformation.value;
    }
    try {
      return await successfulResponseHandler({
        response,
        url,
        requestBodyValues: body.values
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAbortError(error) || APICallError.isInstance(error)) {
          throw error;
        }
      }
      throw new APICallError({
        message: "Failed to process successful response",
        cause: error,
        statusCode: response.status,
        url,
        responseHeaders,
        requestBodyValues: body.values
      });
    }
  } catch (error) {
    throw handleFetchError({ error, url, requestBodyValues: body.values });
  }
};
function tool(tool2) {
  return tool2;
}
function createProviderToolFactoryWithOutputSchema({
  id,
  inputSchema,
  outputSchema: outputSchema2,
  supportsDeferredResults
}) {
  return ({
    execute,
    needsApproval,
    toModelOutput,
    onInputStart,
    onInputDelta,
    onInputAvailable,
    ...args
  }) => tool({
    type: "provider",
    id,
    args,
    inputSchema,
    outputSchema: outputSchema2,
    execute,
    needsApproval,
    toModelOutput,
    onInputStart,
    onInputDelta,
    onInputAvailable,
    supportsDeferredResults
  });
}
async function resolve(value) {
  if (typeof value === "function") {
    value = value();
  }
  return Promise.resolve(value);
}
var createJsonErrorResponseHandler = ({
  errorSchema,
  errorToMessage,
  isRetryable
}) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const responseHeaders = extractResponseHeaders(response);
  if (responseBody.trim() === "") {
    return {
      responseHeaders,
      value: new APICallError({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
  try {
    const parsedError = await parseJSON({
      text: responseBody,
      schema: errorSchema
    });
    return {
      responseHeaders,
      value: new APICallError({
        message: errorToMessage(parsedError),
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        data: parsedError,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response, parsedError)
      })
    };
  } catch (parseError) {
    return {
      responseHeaders,
      value: new APICallError({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
};
var createEventSourceResponseHandler = (chunkSchema) => async ({ response }) => {
  const responseHeaders = extractResponseHeaders(response);
  if (response.body == null) {
    throw new EmptyResponseBodyError({});
  }
  return {
    responseHeaders,
    value: parseJsonEventStream({
      stream: response.body,
      schema: chunkSchema
    })
  };
};
var createJsonResponseHandler = (responseSchema) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const parsedResult = await safeParseJSON({
    text: responseBody,
    schema: responseSchema
  });
  const responseHeaders = extractResponseHeaders(response);
  if (!parsedResult.success) {
    throw new APICallError({
      message: "Invalid JSON response",
      cause: parsedResult.error,
      statusCode: response.status,
      responseHeaders,
      responseBody,
      url,
      requestBodyValues
    });
  }
  return {
    responseHeaders,
    value: parsedResult.value,
    rawValue: parsedResult.rawValue
  };
};
function withoutTrailingSlash(url) {
  return url == null ? void 0 : url.replace(/\/$/, "");
}
function isAsyncIterable(obj) {
  return obj != null && typeof obj[Symbol.asyncIterator] === "function";
}
async function* executeTool({
  execute,
  input,
  options
}) {
  const result = execute(input, options);
  if (isAsyncIterable(result)) {
    let lastOutput;
    for await (const output of result) {
      lastOutput = output;
      yield { type: "preliminary", output };
    }
    yield { type: "final", output: lastOutput };
  } else {
    yield { type: "final", output: await result };
  }
}
var getContext_1;
var hasRequiredGetContext;
function requireGetContext() {
  if (hasRequiredGetContext) return getContext_1;
  hasRequiredGetContext = 1;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name10 in all)
      __defProp2(target, name10, { get: all[name10], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var get_context_exports = {};
  __export2(get_context_exports, {
    SYMBOL_FOR_REQ_CONTEXT: () => SYMBOL_FOR_REQ_CONTEXT,
    getContext: () => getContext
  });
  getContext_1 = __toCommonJS(get_context_exports);
  const SYMBOL_FOR_REQ_CONTEXT = /* @__PURE__ */ Symbol.for("@vercel/request-context");
  function getContext() {
    const fromSymbol = globalThis;
    return fromSymbol[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
  }
  return getContext_1;
}
var authErrors;
var hasRequiredAuthErrors;
function requireAuthErrors() {
  if (hasRequiredAuthErrors) return authErrors;
  hasRequiredAuthErrors = 1;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name10 in all)
      __defProp2(target, name10, { get: all[name10], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var auth_errors_exports = {};
  __export2(auth_errors_exports, {
    AccessTokenMissingError: () => AccessTokenMissingError,
    RefreshAccessTokenFailedError: () => RefreshAccessTokenFailedError
  });
  authErrors = __toCommonJS(auth_errors_exports);
  class AccessTokenMissingError extends Error {
    constructor() {
      super(
        "No authentication found. Please log in with the Vercel CLI (vercel login)."
      );
      this.name = "AccessTokenMissingError";
    }
  }
  class RefreshAccessTokenFailedError extends Error {
    constructor(cause) {
      super("Failed to refresh authentication token.", { cause });
      this.name = "RefreshAccessTokenFailedError";
    }
  }
  return authErrors;
}
var indexBrowser;
var hasRequiredIndexBrowser;
function requireIndexBrowser() {
  if (hasRequiredIndexBrowser) return indexBrowser;
  hasRequiredIndexBrowser = 1;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name10 in all)
      __defProp2(target, name10, { get: all[name10], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var index_browser_exports = {};
  __export2(index_browser_exports, {
    AccessTokenMissingError: () => import_auth_errors.AccessTokenMissingError,
    RefreshAccessTokenFailedError: () => import_auth_errors.RefreshAccessTokenFailedError,
    getContext: () => import_get_context.getContext,
    getVercelOidcToken: () => getVercelOidcToken,
    getVercelOidcTokenSync: () => getVercelOidcTokenSync,
    getVercelToken: () => getVercelToken
  });
  indexBrowser = __toCommonJS(index_browser_exports);
  var import_get_context = requireGetContext();
  var import_auth_errors = requireAuthErrors();
  async function getVercelOidcToken() {
    return "";
  }
  function getVercelOidcTokenSync() {
    return "";
  }
  async function getVercelToken() {
    throw new Error("getVercelToken is not supported in browser environments");
  }
  return indexBrowser;
}
var indexBrowserExports = requireIndexBrowser();
var marker$1 = "vercel.ai.gateway.error";
var symbol$1 = Symbol.for(marker$1);
var _a$1, _b;
var GatewayError = class _GatewayError extends (_b = Error, _a$1 = symbol$1, _b) {
  constructor({
    message,
    statusCode = 500,
    cause,
    generationId,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500)
    // server error
  }) {
    super(generationId ? `${message} [${generationId}]` : message);
    this[_a$1] = true;
    this.statusCode = statusCode;
    this.cause = cause;
    this.generationId = generationId;
    this.isRetryable = isRetryable;
  }
  /**
   * Checks if the given error is a Gateway Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is a Gateway Error, false otherwise.
   */
  static isInstance(error) {
    return _GatewayError.hasMarker(error);
  }
  static hasMarker(error) {
    return typeof error === "object" && error !== null && symbol$1 in error && error[symbol$1] === true;
  }
};
var name$1 = "GatewayAuthenticationError";
var marker2 = `vercel.ai.gateway.error.${name$1}`;
var symbol2 = Symbol.for(marker2);
var _a2, _b2;
var GatewayAuthenticationError = class _GatewayAuthenticationError extends (_b2 = GatewayError, _a2 = symbol2, _b2) {
  constructor({
    message = "Authentication failed",
    statusCode = 401,
    cause,
    generationId
  } = {}) {
    super({ message, statusCode, cause, generationId });
    this[_a2] = true;
    this.name = name$1;
    this.type = "authentication_error";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol2 in error;
  }
  /**
   * Creates a contextual error message when authentication fails
   */
  static createContextualError({
    apiKeyProvided,
    oidcTokenProvided,
    message = "Authentication failed",
    statusCode = 401,
    cause,
    generationId
  }) {
    let contextualMessage;
    if (apiKeyProvided) {
      contextualMessage = `AI Gateway authentication failed: Invalid API key.

Create a new API key: https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys

Provide via 'apiKey' option or 'AI_GATEWAY_API_KEY' environment variable.`;
    } else if (oidcTokenProvided) {
      contextualMessage = `AI Gateway authentication failed: Invalid OIDC token.

Run 'npx vercel link' to link your project, then 'vc env pull' to fetch the token.

Alternatively, use an API key: https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys`;
    } else {
      contextualMessage = `AI Gateway authentication failed: No authentication provided.

Option 1 - API key:
Create an API key: https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys
Provide via 'apiKey' option or 'AI_GATEWAY_API_KEY' environment variable.

Option 2 - OIDC token:
Run 'npx vercel link' to link your project, then 'vc env pull' to fetch the token.`;
    }
    return new _GatewayAuthenticationError({
      message: contextualMessage,
      statusCode,
      cause,
      generationId
    });
  }
};
var name2 = "GatewayInvalidRequestError";
var marker3$1 = `vercel.ai.gateway.error.${name2}`;
var symbol3$1 = Symbol.for(marker3$1);
var _a3$1, _b3;
var GatewayInvalidRequestError = class extends (_b3 = GatewayError, _a3$1 = symbol3$1, _b3) {
  constructor({
    message = "Invalid request",
    statusCode = 400,
    cause,
    generationId
  } = {}) {
    super({ message, statusCode, cause, generationId });
    this[_a3$1] = true;
    this.name = name2;
    this.type = "invalid_request_error";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol3$1 in error;
  }
};
var name3$1 = "GatewayRateLimitError";
var marker4$1 = `vercel.ai.gateway.error.${name3$1}`;
var symbol4$1 = Symbol.for(marker4$1);
var _a4$1, _b4;
var GatewayRateLimitError = class extends (_b4 = GatewayError, _a4$1 = symbol4$1, _b4) {
  constructor({
    message = "Rate limit exceeded",
    statusCode = 429,
    cause,
    generationId
  } = {}) {
    super({ message, statusCode, cause, generationId });
    this[_a4$1] = true;
    this.name = name3$1;
    this.type = "rate_limit_exceeded";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol4$1 in error;
  }
};
var name4$1 = "GatewayModelNotFoundError";
var marker5$1 = `vercel.ai.gateway.error.${name4$1}`;
var symbol5$1 = Symbol.for(marker5$1);
var modelNotFoundParamSchema = lazySchema(
  () => zodSchema(
    object$1({
      modelId: string()
    })
  )
);
var _a5$1, _b5;
var GatewayModelNotFoundError = class extends (_b5 = GatewayError, _a5$1 = symbol5$1, _b5) {
  constructor({
    message = "Model not found",
    statusCode = 404,
    modelId,
    cause,
    generationId
  } = {}) {
    super({ message, statusCode, cause, generationId });
    this[_a5$1] = true;
    this.name = name4$1;
    this.type = "model_not_found";
    this.modelId = modelId;
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol5$1 in error;
  }
};
var name5$1 = "GatewayInternalServerError";
var marker6$1 = `vercel.ai.gateway.error.${name5$1}`;
var symbol6$1 = Symbol.for(marker6$1);
var _a6$1, _b6;
var GatewayInternalServerError = class extends (_b6 = GatewayError, _a6$1 = symbol6$1, _b6) {
  constructor({
    message = "Internal server error",
    statusCode = 500,
    cause,
    generationId
  } = {}) {
    super({ message, statusCode, cause, generationId });
    this[_a6$1] = true;
    this.name = name5$1;
    this.type = "internal_server_error";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol6$1 in error;
  }
};
var name6$1 = "GatewayResponseError";
var marker7 = `vercel.ai.gateway.error.${name6$1}`;
var symbol7 = Symbol.for(marker7);
var _a7, _b7;
var GatewayResponseError = class extends (_b7 = GatewayError, _a7 = symbol7, _b7) {
  constructor({
    message = "Invalid response from Gateway",
    statusCode = 502,
    response,
    validationError,
    cause,
    generationId
  } = {}) {
    super({ message, statusCode, cause, generationId });
    this[_a7] = true;
    this.name = name6$1;
    this.type = "response_error";
    this.response = response;
    this.validationError = validationError;
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol7 in error;
  }
};
async function createGatewayErrorFromResponse({
  response,
  statusCode,
  defaultMessage = "Gateway request failed",
  cause,
  authMethod
}) {
  var _a92;
  const parseResult = await safeValidateTypes({
    value: response,
    schema: gatewayErrorResponseSchema
  });
  if (!parseResult.success) {
    const rawGenerationId = typeof response === "object" && response !== null && "generationId" in response ? response.generationId : void 0;
    return new GatewayResponseError({
      message: `Invalid error response format: ${defaultMessage}`,
      statusCode,
      response,
      validationError: parseResult.error,
      cause,
      generationId: rawGenerationId
    });
  }
  const validatedResponse = parseResult.value;
  const errorType = validatedResponse.error.type;
  const message = validatedResponse.error.message;
  const generationId = (_a92 = validatedResponse.generationId) != null ? _a92 : void 0;
  switch (errorType) {
    case "authentication_error":
      return GatewayAuthenticationError.createContextualError({
        apiKeyProvided: authMethod === "api-key",
        oidcTokenProvided: authMethod === "oidc",
        statusCode,
        cause,
        generationId
      });
    case "invalid_request_error":
      return new GatewayInvalidRequestError({
        message,
        statusCode,
        cause,
        generationId
      });
    case "rate_limit_exceeded":
      return new GatewayRateLimitError({
        message,
        statusCode,
        cause,
        generationId
      });
    case "model_not_found": {
      const modelResult = await safeValidateTypes({
        value: validatedResponse.error.param,
        schema: modelNotFoundParamSchema
      });
      return new GatewayModelNotFoundError({
        message,
        statusCode,
        modelId: modelResult.success ? modelResult.value.modelId : void 0,
        cause,
        generationId
      });
    }
    case "internal_server_error":
      return new GatewayInternalServerError({
        message,
        statusCode,
        cause,
        generationId
      });
    default:
      return new GatewayInternalServerError({
        message,
        statusCode,
        cause,
        generationId
      });
  }
}
var gatewayErrorResponseSchema = lazySchema(
  () => zodSchema(
    object$1({
      error: object$1({
        message: string(),
        type: string().nullish(),
        param: unknown().nullish(),
        code: union([string(), number()]).nullish()
      }),
      generationId: string().nullish()
    })
  )
);
function extractApiCallResponse(error) {
  if (error.data !== void 0) {
    return error.data;
  }
  if (error.responseBody != null) {
    try {
      return JSON.parse(error.responseBody);
    } catch (e) {
      return error.responseBody;
    }
  }
  return {};
}
var name7 = "GatewayTimeoutError";
var marker8$1 = `vercel.ai.gateway.error.${name7}`;
var symbol8$1 = Symbol.for(marker8$1);
var _a8$1, _b8;
var GatewayTimeoutError = class _GatewayTimeoutError extends (_b8 = GatewayError, _a8$1 = symbol8$1, _b8) {
  constructor({
    message = "Request timed out",
    statusCode = 408,
    cause,
    generationId
  } = {}) {
    super({ message, statusCode, cause, generationId });
    this[_a8$1] = true;
    this.name = name7;
    this.type = "timeout_error";
  }
  static isInstance(error) {
    return GatewayError.hasMarker(error) && symbol8$1 in error;
  }
  /**
   * Creates a helpful timeout error message with troubleshooting guidance
   */
  static createTimeoutError({
    originalMessage,
    statusCode = 408,
    cause,
    generationId
  }) {
    const message = `Gateway request timed out: ${originalMessage}

    This is a client-side timeout. To resolve this, increase your timeout configuration: https://vercel.com/docs/ai-gateway/capabilities/video-generation#extending-timeouts-for-node.js`;
    return new _GatewayTimeoutError({
      message,
      statusCode,
      cause,
      generationId
    });
  }
};
function isTimeoutError(error) {
  if (!(error instanceof Error)) {
    return false;
  }
  const errorCode = error.code;
  if (typeof errorCode === "string") {
    const undiciTimeoutCodes = [
      "UND_ERR_HEADERS_TIMEOUT",
      "UND_ERR_BODY_TIMEOUT",
      "UND_ERR_CONNECT_TIMEOUT"
    ];
    return undiciTimeoutCodes.includes(errorCode);
  }
  return false;
}
async function asGatewayError(error, authMethod) {
  var _a92;
  if (GatewayError.isInstance(error)) {
    return error;
  }
  if (isTimeoutError(error)) {
    return GatewayTimeoutError.createTimeoutError({
      originalMessage: error instanceof Error ? error.message : "Unknown error",
      cause: error
    });
  }
  if (APICallError.isInstance(error)) {
    if (error.cause && isTimeoutError(error.cause)) {
      return GatewayTimeoutError.createTimeoutError({
        originalMessage: error.message,
        cause: error
      });
    }
    return await createGatewayErrorFromResponse({
      response: extractApiCallResponse(error),
      statusCode: (_a92 = error.statusCode) != null ? _a92 : 500,
      defaultMessage: "Gateway request failed",
      cause: error,
      authMethod
    });
  }
  return await createGatewayErrorFromResponse({
    response: {},
    statusCode: 500,
    defaultMessage: error instanceof Error ? `Gateway request failed: ${error.message}` : "Unknown Gateway error",
    cause: error,
    authMethod
  });
}
var GATEWAY_AUTH_METHOD_HEADER = "ai-gateway-auth-method";
async function parseAuthMethod(headers) {
  const result = await safeValidateTypes({
    value: headers[GATEWAY_AUTH_METHOD_HEADER],
    schema: gatewayAuthMethodSchema
  });
  return result.success ? result.value : void 0;
}
var gatewayAuthMethodSchema = lazySchema(
  () => zodSchema(union([literal("api-key"), literal("oidc")]))
);
var KNOWN_MODEL_TYPES = [
  "embedding",
  "image",
  "language",
  "reranking",
  "video"
];
var GatewayFetchMetadata = class {
  constructor(config2) {
    this.config = config2;
  }
  async getAvailableModels() {
    try {
      const { value } = await getFromApi({
        url: `${this.config.baseURL}/config`,
        headers: await resolve(this.config.headers()),
        successfulResponseHandler: createJsonResponseHandler(
          gatewayAvailableModelsResponseSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        fetch: this.config.fetch
      });
      return value;
    } catch (error) {
      throw await asGatewayError(error);
    }
  }
  async getCredits() {
    try {
      const baseUrl = new URL(this.config.baseURL);
      const { value } = await getFromApi({
        url: `${baseUrl.origin}/v1/credits`,
        headers: await resolve(this.config.headers()),
        successfulResponseHandler: createJsonResponseHandler(
          gatewayCreditsResponseSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        fetch: this.config.fetch
      });
      return value;
    } catch (error) {
      throw await asGatewayError(error);
    }
  }
};
var gatewayAvailableModelsResponseSchema = lazySchema(
  () => zodSchema(
    object$1({
      models: array$1(
        object$1({
          id: string(),
          name: string(),
          description: string().nullish(),
          pricing: object$1({
            input: string(),
            output: string(),
            input_cache_read: string().nullish(),
            input_cache_write: string().nullish()
          }).transform(
            ({ input, output, input_cache_read, input_cache_write }) => ({
              input,
              output,
              ...input_cache_read ? { cachedInputTokens: input_cache_read } : {},
              ...input_cache_write ? { cacheCreationInputTokens: input_cache_write } : {}
            })
          ).nullish(),
          specification: object$1({
            specificationVersion: literal("v3"),
            provider: string(),
            modelId: string()
          }),
          modelType: string().nullish()
        })
      ).transform(
        (models) => models.filter(
          (m) => m.modelType == null || KNOWN_MODEL_TYPES.includes(m.modelType)
        )
      )
    })
  )
);
var gatewayCreditsResponseSchema = lazySchema(
  () => zodSchema(
    object$1({
      balance: string(),
      total_used: string()
    }).transform(({ balance, total_used }) => ({
      balance,
      totalUsed: total_used
    }))
  )
);
var GatewaySpendReport = class {
  constructor(config2) {
    this.config = config2;
  }
  async getSpendReport(params) {
    try {
      const baseUrl = new URL(this.config.baseURL);
      const searchParams = new URLSearchParams();
      searchParams.set("start_date", params.startDate);
      searchParams.set("end_date", params.endDate);
      if (params.groupBy) {
        searchParams.set("group_by", params.groupBy);
      }
      if (params.datePart) {
        searchParams.set("date_part", params.datePart);
      }
      if (params.userId) {
        searchParams.set("user_id", params.userId);
      }
      if (params.model) {
        searchParams.set("model", params.model);
      }
      if (params.provider) {
        searchParams.set("provider", params.provider);
      }
      if (params.credentialType) {
        searchParams.set("credential_type", params.credentialType);
      }
      if (params.tags && params.tags.length > 0) {
        searchParams.set("tags", params.tags.join(","));
      }
      const { value } = await getFromApi({
        url: `${baseUrl.origin}/v1/report?${searchParams.toString()}`,
        headers: await resolve(this.config.headers()),
        successfulResponseHandler: createJsonResponseHandler(
          gatewaySpendReportResponseSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        fetch: this.config.fetch
      });
      return value;
    } catch (error) {
      throw await asGatewayError(error);
    }
  }
};
var gatewaySpendReportResponseSchema = lazySchema(
  () => zodSchema(
    object$1({
      results: array$1(
        object$1({
          day: string().optional(),
          hour: string().optional(),
          user: string().optional(),
          model: string().optional(),
          tag: string().optional(),
          provider: string().optional(),
          credential_type: _enum(["byok", "system"]).optional(),
          total_cost: number(),
          market_cost: number().optional(),
          input_tokens: number().optional(),
          output_tokens: number().optional(),
          cached_input_tokens: number().optional(),
          cache_creation_input_tokens: number().optional(),
          reasoning_tokens: number().optional(),
          request_count: number().optional()
        }).transform(
          ({
            credential_type,
            total_cost,
            market_cost,
            input_tokens,
            output_tokens,
            cached_input_tokens,
            cache_creation_input_tokens,
            reasoning_tokens,
            request_count,
            ...rest
          }) => ({
            ...rest,
            ...credential_type !== void 0 ? { credentialType: credential_type } : {},
            totalCost: total_cost,
            ...market_cost !== void 0 ? { marketCost: market_cost } : {},
            ...input_tokens !== void 0 ? { inputTokens: input_tokens } : {},
            ...output_tokens !== void 0 ? { outputTokens: output_tokens } : {},
            ...cached_input_tokens !== void 0 ? { cachedInputTokens: cached_input_tokens } : {},
            ...cache_creation_input_tokens !== void 0 ? { cacheCreationInputTokens: cache_creation_input_tokens } : {},
            ...reasoning_tokens !== void 0 ? { reasoningTokens: reasoning_tokens } : {},
            ...request_count !== void 0 ? { requestCount: request_count } : {}
          })
        )
      )
    })
  )
);
var GatewayGenerationInfoFetcher = class {
  constructor(config2) {
    this.config = config2;
  }
  async getGenerationInfo(params) {
    try {
      const baseUrl = new URL(this.config.baseURL);
      const { value } = await getFromApi({
        url: `${baseUrl.origin}/v1/generation?id=${encodeURIComponent(params.id)}`,
        headers: await resolve(this.config.headers()),
        successfulResponseHandler: createJsonResponseHandler(
          gatewayGenerationInfoResponseSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        fetch: this.config.fetch
      });
      return value;
    } catch (error) {
      throw await asGatewayError(error);
    }
  }
};
var gatewayGenerationInfoResponseSchema = lazySchema(
  () => zodSchema(
    object$1({
      data: object$1({
        id: string(),
        total_cost: number(),
        upstream_inference_cost: number(),
        usage: number(),
        created_at: string(),
        model: string(),
        is_byok: boolean(),
        provider_name: string(),
        streamed: boolean(),
        finish_reason: string(),
        latency: number(),
        generation_time: number(),
        native_tokens_prompt: number(),
        native_tokens_completion: number(),
        native_tokens_reasoning: number(),
        native_tokens_cached: number(),
        native_tokens_cache_creation: number(),
        billable_web_search_calls: number()
      }).transform(
        ({
          total_cost,
          upstream_inference_cost,
          created_at,
          is_byok,
          provider_name,
          finish_reason,
          generation_time,
          native_tokens_prompt,
          native_tokens_completion,
          native_tokens_reasoning,
          native_tokens_cached,
          native_tokens_cache_creation,
          billable_web_search_calls,
          ...rest
        }) => ({
          ...rest,
          totalCost: total_cost,
          upstreamInferenceCost: upstream_inference_cost,
          createdAt: created_at,
          isByok: is_byok,
          providerName: provider_name,
          finishReason: finish_reason,
          generationTime: generation_time,
          promptTokens: native_tokens_prompt,
          completionTokens: native_tokens_completion,
          reasoningTokens: native_tokens_reasoning,
          cachedTokens: native_tokens_cached,
          cacheCreationTokens: native_tokens_cache_creation,
          billableWebSearchCalls: billable_web_search_calls
        })
      )
    }).transform(({ data }) => data)
  )
);
var GatewayLanguageModel = class {
  constructor(modelId, config2) {
    this.modelId = modelId;
    this.config = config2;
    this.specificationVersion = "v3";
    this.supportedUrls = { "*/*": [/.*/] };
  }
  get provider() {
    return this.config.provider;
  }
  async getArgs(options) {
    const { abortSignal: _abortSignal, ...optionsWithoutSignal } = options;
    return {
      args: this.maybeEncodeFileParts(optionsWithoutSignal),
      warnings: []
    };
  }
  async doGenerate(options) {
    const { args, warnings } = await this.getArgs(options);
    const { abortSignal } = options;
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const {
        responseHeaders,
        value: responseBody,
        rawValue: rawResponse
      } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          options.headers,
          this.getModelConfigHeaders(this.modelId, false),
          await resolve(this.config.o11yHeaders)
        ),
        body: args,
        successfulResponseHandler: createJsonResponseHandler(any()),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        ...responseBody,
        request: { body: args },
        response: { headers: responseHeaders, body: rawResponse },
        warnings
      };
    } catch (error) {
      throw await asGatewayError(error, await parseAuthMethod(resolvedHeaders));
    }
  }
  async doStream(options) {
    const { args, warnings } = await this.getArgs(options);
    const { abortSignal } = options;
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const { value: response, responseHeaders } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          options.headers,
          this.getModelConfigHeaders(this.modelId, true),
          await resolve(this.config.o11yHeaders)
        ),
        body: args,
        successfulResponseHandler: createEventSourceResponseHandler(any()),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        stream: response.pipeThrough(
          new TransformStream({
            start(controller) {
              if (warnings.length > 0) {
                controller.enqueue({ type: "stream-start", warnings });
              }
            },
            transform(chunk, controller) {
              if (chunk.success) {
                const streamPart = chunk.value;
                if (streamPart.type === "raw" && !options.includeRawChunks) {
                  return;
                }
                if (streamPart.type === "response-metadata" && streamPart.timestamp && typeof streamPart.timestamp === "string") {
                  streamPart.timestamp = new Date(streamPart.timestamp);
                }
                controller.enqueue(streamPart);
              } else {
                controller.error(
                  chunk.error
                );
              }
            }
          })
        ),
        request: { body: args },
        response: { headers: responseHeaders }
      };
    } catch (error) {
      throw await asGatewayError(error, await parseAuthMethod(resolvedHeaders));
    }
  }
  isFilePart(part) {
    return part && typeof part === "object" && "type" in part && part.type === "file";
  }
  /**
   * Encodes file parts in the prompt to base64. Mutates the passed options
   * instance directly to avoid copying the file data.
   * @param options - The options to encode.
   * @returns The options with the file parts encoded.
   */
  maybeEncodeFileParts(options) {
    for (const message of options.prompt) {
      for (const part of message.content) {
        if (this.isFilePart(part)) {
          const filePart = part;
          if (filePart.data instanceof Uint8Array) {
            const buffer = Uint8Array.from(filePart.data);
            const base64Data = Buffer.from(buffer).toString("base64");
            filePart.data = new URL(
              `data:${filePart.mediaType || "application/octet-stream"};base64,${base64Data}`
            );
          }
        }
      }
    }
    return options;
  }
  getUrl() {
    return `${this.config.baseURL}/language-model`;
  }
  getModelConfigHeaders(modelId, streaming) {
    return {
      "ai-language-model-specification-version": "3",
      "ai-language-model-id": modelId,
      "ai-language-model-streaming": String(streaming)
    };
  }
};
var GatewayEmbeddingModel = class {
  constructor(modelId, config2) {
    this.modelId = modelId;
    this.config = config2;
    this.specificationVersion = "v3";
    this.maxEmbeddingsPerCall = 2048;
    this.supportsParallelCalls = true;
  }
  get provider() {
    return this.config.provider;
  }
  async doEmbed({
    values,
    headers,
    abortSignal,
    providerOptions
  }) {
    var _a92;
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const {
        responseHeaders,
        value: responseBody,
        rawValue
      } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          headers != null ? headers : {},
          this.getModelConfigHeaders(),
          await resolve(this.config.o11yHeaders)
        ),
        body: {
          values,
          ...providerOptions ? { providerOptions } : {}
        },
        successfulResponseHandler: createJsonResponseHandler(
          gatewayEmbeddingResponseSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        embeddings: responseBody.embeddings,
        usage: (_a92 = responseBody.usage) != null ? _a92 : void 0,
        providerMetadata: responseBody.providerMetadata,
        response: { headers: responseHeaders, body: rawValue },
        warnings: []
      };
    } catch (error) {
      throw await asGatewayError(error, await parseAuthMethod(resolvedHeaders));
    }
  }
  getUrl() {
    return `${this.config.baseURL}/embedding-model`;
  }
  getModelConfigHeaders() {
    return {
      "ai-embedding-model-specification-version": "3",
      "ai-model-id": this.modelId
    };
  }
};
var gatewayEmbeddingResponseSchema = lazySchema(
  () => zodSchema(
    object$1({
      embeddings: array$1(array$1(number())),
      usage: object$1({ tokens: number() }).nullish(),
      providerMetadata: record(string(), record(string(), unknown())).optional()
    })
  )
);
var GatewayImageModel = class {
  constructor(modelId, config2) {
    this.modelId = modelId;
    this.config = config2;
    this.specificationVersion = "v3";
    this.maxImagesPerCall = Number.MAX_SAFE_INTEGER;
  }
  get provider() {
    return this.config.provider;
  }
  async doGenerate({
    prompt,
    n,
    size,
    aspectRatio,
    seed,
    files,
    mask,
    providerOptions,
    headers,
    abortSignal
  }) {
    var _a92, _b9, _c, _d;
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const {
        responseHeaders,
        value: responseBody,
        rawValue
      } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          headers != null ? headers : {},
          this.getModelConfigHeaders(),
          await resolve(this.config.o11yHeaders)
        ),
        body: {
          prompt,
          n,
          ...size && { size },
          ...aspectRatio && { aspectRatio },
          ...seed && { seed },
          ...providerOptions && { providerOptions },
          ...files && {
            files: files.map((file) => maybeEncodeImageFile(file))
          },
          ...mask && { mask: maybeEncodeImageFile(mask) }
        },
        successfulResponseHandler: createJsonResponseHandler(
          gatewayImageResponseSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        images: responseBody.images,
        // Always base64 strings from server
        warnings: (_a92 = responseBody.warnings) != null ? _a92 : [],
        providerMetadata: responseBody.providerMetadata,
        response: {
          timestamp: /* @__PURE__ */ new Date(),
          modelId: this.modelId,
          headers: responseHeaders
        },
        ...responseBody.usage != null && {
          usage: {
            inputTokens: (_b9 = responseBody.usage.inputTokens) != null ? _b9 : void 0,
            outputTokens: (_c = responseBody.usage.outputTokens) != null ? _c : void 0,
            totalTokens: (_d = responseBody.usage.totalTokens) != null ? _d : void 0
          }
        }
      };
    } catch (error) {
      throw await asGatewayError(error, await parseAuthMethod(resolvedHeaders));
    }
  }
  getUrl() {
    return `${this.config.baseURL}/image-model`;
  }
  getModelConfigHeaders() {
    return {
      "ai-image-model-specification-version": "3",
      "ai-model-id": this.modelId
    };
  }
};
function maybeEncodeImageFile(file) {
  if (file.type === "file" && file.data instanceof Uint8Array) {
    return {
      ...file,
      data: convertUint8ArrayToBase64(file.data)
    };
  }
  return file;
}
var providerMetadataEntrySchema = object$1({
  images: array$1(unknown()).optional()
}).catchall(unknown());
var gatewayImageWarningSchema = discriminatedUnion("type", [
  object$1({
    type: literal("unsupported"),
    feature: string(),
    details: string().optional()
  }),
  object$1({
    type: literal("compatibility"),
    feature: string(),
    details: string().optional()
  }),
  object$1({
    type: literal("other"),
    message: string()
  })
]);
var gatewayImageUsageSchema = object$1({
  inputTokens: number().nullish(),
  outputTokens: number().nullish(),
  totalTokens: number().nullish()
});
var gatewayImageResponseSchema = object$1({
  images: array$1(string()),
  // Always base64 strings over the wire
  warnings: array$1(gatewayImageWarningSchema).optional(),
  providerMetadata: record(string(), providerMetadataEntrySchema).optional(),
  usage: gatewayImageUsageSchema.optional()
});
var GatewayVideoModel = class {
  constructor(modelId, config2) {
    this.modelId = modelId;
    this.config = config2;
    this.specificationVersion = "v3";
    this.maxVideosPerCall = Number.MAX_SAFE_INTEGER;
  }
  get provider() {
    return this.config.provider;
  }
  async doGenerate({
    prompt,
    n,
    aspectRatio,
    resolution,
    duration: duration2,
    fps,
    seed,
    image,
    providerOptions,
    headers,
    abortSignal
  }) {
    var _a92;
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const { responseHeaders, value: responseBody } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          headers != null ? headers : {},
          this.getModelConfigHeaders(),
          await resolve(this.config.o11yHeaders),
          { accept: "text/event-stream" }
        ),
        body: {
          prompt,
          n,
          ...aspectRatio && { aspectRatio },
          ...resolution && { resolution },
          ...duration2 && { duration: duration2 },
          ...fps && { fps },
          ...seed && { seed },
          ...providerOptions && { providerOptions },
          ...image && { image: maybeEncodeVideoFile(image) }
        },
        successfulResponseHandler: async ({
          response,
          url,
          requestBodyValues
        }) => {
          if (response.body == null) {
            throw new APICallError({
              message: "SSE response body is empty",
              url,
              requestBodyValues,
              statusCode: response.status
            });
          }
          const eventStream = parseJsonEventStream({
            stream: response.body,
            schema: gatewayVideoEventSchema
          });
          const reader = eventStream.getReader();
          const { done, value: parseResult } = await reader.read();
          reader.releaseLock();
          if (done || !parseResult) {
            throw new APICallError({
              message: "SSE stream ended without a data event",
              url,
              requestBodyValues,
              statusCode: response.status
            });
          }
          if (!parseResult.success) {
            throw new APICallError({
              message: "Failed to parse video SSE event",
              cause: parseResult.error,
              url,
              requestBodyValues,
              statusCode: response.status
            });
          }
          const event = parseResult.value;
          if (event.type === "error") {
            throw new APICallError({
              message: event.message,
              statusCode: event.statusCode,
              url,
              requestBodyValues,
              responseHeaders: Object.fromEntries([...response.headers]),
              responseBody: JSON.stringify(event),
              data: {
                error: {
                  message: event.message,
                  type: event.errorType,
                  param: event.param
                }
              }
            });
          }
          return {
            value: {
              videos: event.videos,
              warnings: event.warnings,
              providerMetadata: event.providerMetadata
            },
            responseHeaders: Object.fromEntries([...response.headers])
          };
        },
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        videos: responseBody.videos,
        warnings: (_a92 = responseBody.warnings) != null ? _a92 : [],
        providerMetadata: responseBody.providerMetadata,
        response: {
          timestamp: /* @__PURE__ */ new Date(),
          modelId: this.modelId,
          headers: responseHeaders
        }
      };
    } catch (error) {
      throw await asGatewayError(error, await parseAuthMethod(resolvedHeaders));
    }
  }
  getUrl() {
    return `${this.config.baseURL}/video-model`;
  }
  getModelConfigHeaders() {
    return {
      "ai-video-model-specification-version": "3",
      "ai-model-id": this.modelId
    };
  }
};
function maybeEncodeVideoFile(file) {
  if (file.type === "file" && file.data instanceof Uint8Array) {
    return {
      ...file,
      data: convertUint8ArrayToBase64(file.data)
    };
  }
  return file;
}
var providerMetadataEntrySchema2 = object$1({
  videos: array$1(unknown()).optional()
}).catchall(unknown());
var gatewayVideoDataSchema = union([
  object$1({
    type: literal("url"),
    url: string(),
    mediaType: string()
  }),
  object$1({
    type: literal("base64"),
    data: string(),
    mediaType: string()
  })
]);
var gatewayVideoWarningSchema = discriminatedUnion("type", [
  object$1({
    type: literal("unsupported"),
    feature: string(),
    details: string().optional()
  }),
  object$1({
    type: literal("compatibility"),
    feature: string(),
    details: string().optional()
  }),
  object$1({
    type: literal("other"),
    message: string()
  })
]);
var gatewayVideoEventSchema = discriminatedUnion("type", [
  object$1({
    type: literal("result"),
    videos: array$1(gatewayVideoDataSchema),
    warnings: array$1(gatewayVideoWarningSchema).optional(),
    providerMetadata: record(string(), providerMetadataEntrySchema2).optional()
  }),
  object$1({
    type: literal("error"),
    message: string(),
    errorType: string(),
    statusCode: number(),
    param: unknown().nullable()
  })
]);
var GatewayRerankingModel = class {
  constructor(modelId, config2) {
    this.modelId = modelId;
    this.config = config2;
    this.specificationVersion = "v3";
  }
  get provider() {
    return this.config.provider;
  }
  async doRerank({
    documents,
    query,
    topN,
    headers,
    abortSignal,
    providerOptions
  }) {
    const resolvedHeaders = await resolve(this.config.headers());
    try {
      const {
        responseHeaders,
        value: responseBody,
        rawValue
      } = await postJsonToApi({
        url: this.getUrl(),
        headers: combineHeaders(
          resolvedHeaders,
          headers != null ? headers : {},
          this.getModelConfigHeaders(),
          await resolve(this.config.o11yHeaders)
        ),
        body: {
          documents,
          query,
          ...topN != null ? { topN } : {},
          ...providerOptions ? { providerOptions } : {}
        },
        successfulResponseHandler: createJsonResponseHandler(
          gatewayRerankingResponseSchema
        ),
        failedResponseHandler: createJsonErrorResponseHandler({
          errorSchema: any(),
          errorToMessage: (data) => data
        }),
        ...abortSignal && { abortSignal },
        fetch: this.config.fetch
      });
      return {
        ranking: responseBody.ranking,
        providerMetadata: responseBody.providerMetadata,
        response: { headers: responseHeaders, body: rawValue },
        warnings: []
      };
    } catch (error) {
      throw await asGatewayError(error, await parseAuthMethod(resolvedHeaders));
    }
  }
  getUrl() {
    return `${this.config.baseURL}/reranking-model`;
  }
  getModelConfigHeaders() {
    return {
      "ai-reranking-model-specification-version": "3",
      "ai-model-id": this.modelId
    };
  }
};
var gatewayRerankingResponseSchema = lazySchema(
  () => zodSchema(
    object$1({
      ranking: array$1(
        object$1({
          index: number(),
          relevanceScore: number()
        })
      ),
      providerMetadata: record(string(), record(string(), unknown())).optional()
    })
  )
);
var parallelSearchInputSchema = lazySchema(
  () => zodSchema(
    objectType({
      objective: stringType().describe(
        "Natural-language description of the web research goal, including source or freshness guidance and broader context from the task. Maximum 5000 characters."
      ),
      search_queries: arrayType(stringType()).optional().describe(
        "Optional search queries to supplement the objective. Maximum 200 characters per query."
      ),
      mode: enumType(["one-shot", "agentic"]).optional().describe(
        'Mode preset: "one-shot" for comprehensive results with longer excerpts (default), "agentic" for concise, token-efficient results for multi-step workflows.'
      ),
      max_results: numberType().optional().describe(
        "Maximum number of results to return (1-20). Defaults to 10 if not specified."
      ),
      source_policy: objectType({
        include_domains: arrayType(stringType()).optional().describe("List of domains to include in search results."),
        exclude_domains: arrayType(stringType()).optional().describe("List of domains to exclude from search results."),
        after_date: stringType().optional().describe(
          "Only include results published after this date (ISO 8601 format)."
        )
      }).optional().describe(
        "Source policy for controlling which domains to include/exclude and freshness."
      ),
      excerpts: objectType({
        max_chars_per_result: numberType().optional().describe("Maximum characters per result."),
        max_chars_total: numberType().optional().describe("Maximum total characters across all results.")
      }).optional().describe("Excerpt configuration for controlling result length."),
      fetch_policy: objectType({
        max_age_seconds: numberType().optional().describe(
          "Maximum age in seconds for cached content. Set to 0 to always fetch fresh content."
        )
      }).optional().describe("Fetch policy for controlling content freshness.")
    })
  )
);
var parallelSearchOutputSchema = lazySchema(
  () => zodSchema(
    unionType([
      // Success response
      objectType({
        searchId: stringType(),
        results: arrayType(
          objectType({
            url: stringType(),
            title: stringType(),
            excerpt: stringType(),
            publishDate: stringType().nullable().optional(),
            relevanceScore: numberType().optional()
          })
        )
      }),
      // Error response
      objectType({
        error: enumType([
          "api_error",
          "rate_limit",
          "timeout",
          "invalid_input",
          "configuration_error",
          "unknown"
        ]),
        statusCode: numberType().optional(),
        message: stringType()
      })
    ])
  )
);
var parallelSearchToolFactory = createProviderToolFactoryWithOutputSchema({
  id: "gateway.parallel_search",
  inputSchema: parallelSearchInputSchema,
  outputSchema: parallelSearchOutputSchema
});
var parallelSearch = (config2 = {}) => parallelSearchToolFactory(config2);
var perplexitySearchInputSchema = lazySchema(
  () => zodSchema(
    objectType({
      query: unionType([stringType(), arrayType(stringType())]).describe(
        "Search query (string) or multiple queries (array of up to 5 strings). Multi-query searches return combined results from all queries."
      ),
      max_results: numberType().optional().describe(
        "Maximum number of search results to return (1-20, default: 10)"
      ),
      max_tokens_per_page: numberType().optional().describe(
        "Maximum number of tokens to extract per search result page (256-2048, default: 2048)"
      ),
      max_tokens: numberType().optional().describe(
        "Maximum total tokens across all search results (default: 25000, max: 1000000)"
      ),
      country: stringType().optional().describe(
        "Two-letter ISO 3166-1 alpha-2 country code for regional search results (e.g., 'US', 'GB', 'FR')"
      ),
      search_domain_filter: arrayType(stringType()).optional().describe(
        "List of domains to include or exclude from search results (max 20). To include: ['nature.com', 'science.org']. To exclude: ['-example.com', '-spam.net']"
      ),
      search_language_filter: arrayType(stringType()).optional().describe(
        "List of ISO 639-1 language codes to filter results (max 10, lowercase). Examples: ['en', 'fr', 'de']"
      ),
      search_after_date: stringType().optional().describe(
        "Include only results published after this date. Format: 'MM/DD/YYYY' (e.g., '3/1/2025'). Cannot be used with search_recency_filter."
      ),
      search_before_date: stringType().optional().describe(
        "Include only results published before this date. Format: 'MM/DD/YYYY' (e.g., '3/15/2025'). Cannot be used with search_recency_filter."
      ),
      last_updated_after_filter: stringType().optional().describe(
        "Include only results last updated after this date. Format: 'MM/DD/YYYY' (e.g., '3/1/2025'). Cannot be used with search_recency_filter."
      ),
      last_updated_before_filter: stringType().optional().describe(
        "Include only results last updated before this date. Format: 'MM/DD/YYYY' (e.g., '3/15/2025'). Cannot be used with search_recency_filter."
      ),
      search_recency_filter: enumType(["day", "week", "month", "year"]).optional().describe(
        "Filter results by relative time period. Cannot be used with search_after_date or search_before_date."
      )
    })
  )
);
var perplexitySearchOutputSchema = lazySchema(
  () => zodSchema(
    unionType([
      // Success response
      objectType({
        results: arrayType(
          objectType({
            title: stringType(),
            url: stringType(),
            snippet: stringType(),
            date: stringType().optional(),
            lastUpdated: stringType().optional()
          })
        ),
        id: stringType()
      }),
      // Error response
      objectType({
        error: enumType([
          "api_error",
          "rate_limit",
          "timeout",
          "invalid_input",
          "unknown"
        ]),
        statusCode: numberType().optional(),
        message: stringType()
      })
    ])
  )
);
var perplexitySearchToolFactory = createProviderToolFactoryWithOutputSchema({
  id: "gateway.perplexity_search",
  inputSchema: perplexitySearchInputSchema,
  outputSchema: perplexitySearchOutputSchema
});
var perplexitySearch = (config2 = {}) => perplexitySearchToolFactory(config2);
var gatewayTools = {
  /**
   * Search the web using Parallel AI's Search API for LLM-optimized excerpts.
   *
   * Takes a natural language objective and returns relevant excerpts,
   * replacing multiple keyword searches with a single call for broad
   * or complex queries. Supports different search types for depth vs
   * breadth tradeoffs.
   */
  parallelSearch,
  /**
   * Search the web using Perplexity's Search API for real-time information,
   * news, research papers, and articles.
   *
   * Provides ranked search results with advanced filtering options including
   * domain, language, date range, and recency filters.
   */
  perplexitySearch
};
async function getVercelRequestId() {
  var _a92;
  return (_a92 = indexBrowserExports.getContext().headers) == null ? void 0 : _a92["x-vercel-id"];
}
var VERSION$3 = "3.0.118";
var AI_GATEWAY_PROTOCOL_VERSION = "0.0.1";
function createGatewayProvider(options = {}) {
  var _a92, _b9;
  let pendingMetadata = null;
  let metadataCache = null;
  const cacheRefreshMillis = (_a92 = options.metadataCacheRefreshMillis) != null ? _a92 : 1e3 * 60 * 5;
  let lastFetchTime = 0;
  const baseURL = (_b9 = withoutTrailingSlash(options.baseURL)) != null ? _b9 : "https://ai-gateway.vercel.sh/v3/ai";
  const getHeaders = async () => {
    try {
      const auth = await getGatewayAuthToken(options);
      return withUserAgentSuffix(
        {
          Authorization: `Bearer ${auth.token}`,
          "ai-gateway-protocol-version": AI_GATEWAY_PROTOCOL_VERSION,
          [GATEWAY_AUTH_METHOD_HEADER]: auth.authMethod,
          ...options.headers
        },
        `ai-sdk/gateway/${VERSION$3}`
      );
    } catch (error) {
      throw GatewayAuthenticationError.createContextualError({
        apiKeyProvided: false,
        oidcTokenProvided: false,
        statusCode: 401,
        cause: error
      });
    }
  };
  const createO11yHeaders = () => {
    const deploymentId = loadOptionalSetting({
      settingValue: void 0,
      environmentVariableName: "VERCEL_DEPLOYMENT_ID"
    });
    const environment = loadOptionalSetting({
      settingValue: void 0,
      environmentVariableName: "VERCEL_ENV"
    });
    const region = loadOptionalSetting({
      settingValue: void 0,
      environmentVariableName: "VERCEL_REGION"
    });
    const projectId = loadOptionalSetting({
      settingValue: void 0,
      environmentVariableName: "VERCEL_PROJECT_ID"
    });
    return async () => {
      const requestId = await getVercelRequestId();
      return {
        ...deploymentId && { "ai-o11y-deployment-id": deploymentId },
        ...environment && { "ai-o11y-environment": environment },
        ...region && { "ai-o11y-region": region },
        ...requestId && { "ai-o11y-request-id": requestId },
        ...projectId && { "ai-o11y-project-id": projectId }
      };
    };
  };
  const createLanguageModel = (modelId) => {
    return new GatewayLanguageModel(modelId, {
      provider: "gateway",
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
      o11yHeaders: createO11yHeaders()
    });
  };
  const getAvailableModels = async () => {
    var _a10, _b10, _c;
    const now2 = (_c = (_b10 = (_a10 = options._internal) == null ? void 0 : _a10.currentDate) == null ? void 0 : _b10.call(_a10).getTime()) != null ? _c : Date.now();
    if (!pendingMetadata || now2 - lastFetchTime > cacheRefreshMillis) {
      lastFetchTime = now2;
      pendingMetadata = new GatewayFetchMetadata({
        baseURL,
        headers: getHeaders,
        fetch: options.fetch
      }).getAvailableModels().then((metadata) => {
        metadataCache = metadata;
        return metadata;
      }).catch(async (error) => {
        throw await asGatewayError(
          error,
          await parseAuthMethod(await getHeaders())
        );
      });
    }
    return metadataCache ? Promise.resolve(metadataCache) : pendingMetadata;
  };
  const getCredits = async () => {
    return new GatewayFetchMetadata({
      baseURL,
      headers: getHeaders,
      fetch: options.fetch
    }).getCredits().catch(async (error) => {
      throw await asGatewayError(
        error,
        await parseAuthMethod(await getHeaders())
      );
    });
  };
  const getSpendReport = async (params) => {
    return new GatewaySpendReport({
      baseURL,
      headers: getHeaders,
      fetch: options.fetch
    }).getSpendReport(params).catch(async (error) => {
      throw await asGatewayError(
        error,
        await parseAuthMethod(await getHeaders())
      );
    });
  };
  const getGenerationInfo = async (params) => {
    return new GatewayGenerationInfoFetcher({
      baseURL,
      headers: getHeaders,
      fetch: options.fetch
    }).getGenerationInfo(params).catch(async (error) => {
      throw await asGatewayError(
        error,
        await parseAuthMethod(await getHeaders())
      );
    });
  };
  const provider = function(modelId) {
    if (new.target) {
      throw new Error(
        "The Gateway Provider model function cannot be called with the new keyword."
      );
    }
    return createLanguageModel(modelId);
  };
  provider.specificationVersion = "v3";
  provider.getAvailableModels = getAvailableModels;
  provider.getCredits = getCredits;
  provider.getSpendReport = getSpendReport;
  provider.getGenerationInfo = getGenerationInfo;
  provider.imageModel = (modelId) => {
    return new GatewayImageModel(modelId, {
      provider: "gateway",
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
      o11yHeaders: createO11yHeaders()
    });
  };
  provider.languageModel = createLanguageModel;
  const createEmbeddingModel = (modelId) => {
    return new GatewayEmbeddingModel(modelId, {
      provider: "gateway",
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
      o11yHeaders: createO11yHeaders()
    });
  };
  provider.embeddingModel = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  provider.videoModel = (modelId) => {
    return new GatewayVideoModel(modelId, {
      provider: "gateway",
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
      o11yHeaders: createO11yHeaders()
    });
  };
  const createRerankingModel = (modelId) => {
    return new GatewayRerankingModel(modelId, {
      provider: "gateway",
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
      o11yHeaders: createO11yHeaders()
    });
  };
  provider.rerankingModel = createRerankingModel;
  provider.reranking = createRerankingModel;
  provider.chat = provider.languageModel;
  provider.embedding = provider.embeddingModel;
  provider.image = provider.imageModel;
  provider.video = provider.videoModel;
  provider.tools = gatewayTools;
  return provider;
}
var gateway = createGatewayProvider();
async function getGatewayAuthToken(options) {
  const apiKey = loadOptionalSetting({
    settingValue: options.apiKey,
    environmentVariableName: "AI_GATEWAY_API_KEY"
  });
  if (apiKey) {
    return {
      token: apiKey,
      authMethod: "api-key"
    };
  }
  const oidcToken = await indexBrowserExports.getVercelOidcToken();
  return {
    token: oidcToken,
    authMethod: "oidc"
  };
}
const VERSION$2 = "1.9.1";
const re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function _makeCompatibilityCheck(ownVersion) {
  const acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
  const rejectedVersions = /* @__PURE__ */ new Set();
  const myVersionMatch = ownVersion.match(re);
  if (!myVersionMatch) {
    return () => false;
  }
  const ownVersionParsed = {
    major: +myVersionMatch[1],
    minor: +myVersionMatch[2],
    patch: +myVersionMatch[3],
    prerelease: myVersionMatch[4]
  };
  if (ownVersionParsed.prerelease != null) {
    return function isExactmatch(globalVersion) {
      return globalVersion === ownVersion;
    };
  }
  function _reject(v) {
    rejectedVersions.add(v);
    return false;
  }
  function _accept(v) {
    acceptedVersions.add(v);
    return true;
  }
  return function isCompatible2(globalVersion) {
    if (acceptedVersions.has(globalVersion)) {
      return true;
    }
    if (rejectedVersions.has(globalVersion)) {
      return false;
    }
    const globalVersionMatch = globalVersion.match(re);
    if (!globalVersionMatch) {
      return _reject(globalVersion);
    }
    const globalVersionParsed = {
      major: +globalVersionMatch[1],
      minor: +globalVersionMatch[2],
      patch: +globalVersionMatch[3],
      prerelease: globalVersionMatch[4]
    };
    if (globalVersionParsed.prerelease != null) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major !== globalVersionParsed.major) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major === 0) {
      if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    }
    if (ownVersionParsed.minor <= globalVersionParsed.minor) {
      return _accept(globalVersion);
    }
    return _reject(globalVersion);
  };
}
const isCompatible = _makeCompatibilityCheck(VERSION$2);
const major = VERSION$2.split(".")[0];
const GLOBAL_OPENTELEMETRY_API_KEY = /* @__PURE__ */ Symbol.for(`opentelemetry.js.api.${major}`);
const _global = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};
function registerGlobal(type, instance, diag, allowOverride = false) {
  var _a10;
  const api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a10 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a10 !== void 0 ? _a10 : {
    version: VERSION$2
  };
  if (!allowOverride && api[type]) {
    const err = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${type}`);
    diag.error(err.stack || err.message);
    return false;
  }
  if (api.version !== VERSION$2) {
    const err = new Error(`@opentelemetry/api: Registration of version v${api.version} for ${type} does not match previously registered API v${VERSION$2}`);
    diag.error(err.stack || err.message);
    return false;
  }
  api[type] = instance;
  diag.debug(`@opentelemetry/api: Registered a global for ${type} v${VERSION$2}.`);
  return true;
}
function getGlobal(type) {
  var _a10, _b9;
  const globalVersion = (_a10 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a10 === void 0 ? void 0 : _a10.version;
  if (!globalVersion || !isCompatible(globalVersion)) {
    return;
  }
  return (_b9 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b9 === void 0 ? void 0 : _b9[type];
}
function unregisterGlobal(type, diag) {
  diag.debug(`@opentelemetry/api: Unregistering a global for ${type} v${VERSION$2}.`);
  const api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
  if (api) {
    delete api[type];
  }
}
class DiagComponentLogger {
  constructor(props) {
    this._namespace = props.namespace || "DiagComponentLogger";
  }
  debug(...args) {
    return logProxy("debug", this._namespace, args);
  }
  error(...args) {
    return logProxy("error", this._namespace, args);
  }
  info(...args) {
    return logProxy("info", this._namespace, args);
  }
  warn(...args) {
    return logProxy("warn", this._namespace, args);
  }
  verbose(...args) {
    return logProxy("verbose", this._namespace, args);
  }
}
function logProxy(funcName, namespace, args) {
  const logger = getGlobal("diag");
  if (!logger) {
    return;
  }
  return logger[funcName](namespace, ...args);
}
var DiagLogLevel;
(function(DiagLogLevel2) {
  DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
  DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
  DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
  DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
  DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
  DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
  DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
})(DiagLogLevel || (DiagLogLevel = {}));
function createLogLevelDiagLogger(maxLevel, logger) {
  if (maxLevel < DiagLogLevel.NONE) {
    maxLevel = DiagLogLevel.NONE;
  } else if (maxLevel > DiagLogLevel.ALL) {
    maxLevel = DiagLogLevel.ALL;
  }
  logger = logger || {};
  function _filterFunc(funcName, theLevel) {
    const theFunc = logger[funcName];
    if (typeof theFunc === "function" && maxLevel >= theLevel) {
      return theFunc.bind(logger);
    }
    return function() {
    };
  }
  return {
    error: _filterFunc("error", DiagLogLevel.ERROR),
    warn: _filterFunc("warn", DiagLogLevel.WARN),
    info: _filterFunc("info", DiagLogLevel.INFO),
    debug: _filterFunc("debug", DiagLogLevel.DEBUG),
    verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
  };
}
const API_NAME$2 = "diag";
class DiagAPI {
  /** Get the singleton instance of the DiagAPI API */
  static instance() {
    if (!this._instance) {
      this._instance = new DiagAPI();
    }
    return this._instance;
  }
  /**
   * Private internal constructor
   * @private
   */
  constructor() {
    function _logProxy(funcName) {
      return function(...args) {
        const logger = getGlobal("diag");
        if (!logger)
          return;
        return logger[funcName](...args);
      };
    }
    const self2 = this;
    const setLogger = (logger, optionsOrLogLevel = { logLevel: DiagLogLevel.INFO }) => {
      var _a10, _b9, _c;
      if (logger === self2) {
        const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
        self2.error((_a10 = err.stack) !== null && _a10 !== void 0 ? _a10 : err.message);
        return false;
      }
      if (typeof optionsOrLogLevel === "number") {
        optionsOrLogLevel = {
          logLevel: optionsOrLogLevel
        };
      }
      const oldLogger = getGlobal("diag");
      const newLogger = createLogLevelDiagLogger((_b9 = optionsOrLogLevel.logLevel) !== null && _b9 !== void 0 ? _b9 : DiagLogLevel.INFO, logger);
      if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
        const stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
        oldLogger.warn(`Current logger will be overwritten from ${stack}`);
        newLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
      }
      return registerGlobal("diag", newLogger, self2, true);
    };
    self2.setLogger = setLogger;
    self2.disable = () => {
      unregisterGlobal(API_NAME$2, self2);
    };
    self2.createComponentLogger = (options) => {
      return new DiagComponentLogger(options);
    };
    self2.verbose = _logProxy("verbose");
    self2.debug = _logProxy("debug");
    self2.info = _logProxy("info");
    self2.warn = _logProxy("warn");
    self2.error = _logProxy("error");
  }
}
function createContextKey(description) {
  return Symbol.for(description);
}
class BaseContext {
  /**
   * Construct a new context which inherits values from an optional parent context.
   *
   * @param parentContext a context from which to inherit values
   */
  constructor(parentContext) {
    const self2 = this;
    self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
    self2.getValue = (key) => self2._currentContext.get(key);
    self2.setValue = (key, value) => {
      const context2 = new BaseContext(self2._currentContext);
      context2._currentContext.set(key, value);
      return context2;
    };
    self2.deleteValue = (key) => {
      const context2 = new BaseContext(self2._currentContext);
      context2._currentContext.delete(key);
      return context2;
    };
  }
}
const ROOT_CONTEXT = new BaseContext();
class NoopContextManager {
  active() {
    return ROOT_CONTEXT;
  }
  with(_context, fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  bind(_context, target) {
    return target;
  }
  enable() {
    return this;
  }
  disable() {
    return this;
  }
}
const API_NAME$1 = "context";
const NOOP_CONTEXT_MANAGER = new NoopContextManager();
class ContextAPI {
  /** Empty private constructor prevents end users from constructing a new instance of the API */
  constructor() {
  }
  /** Get the singleton instance of the Context API */
  static getInstance() {
    if (!this._instance) {
      this._instance = new ContextAPI();
    }
    return this._instance;
  }
  /**
   * Set the current context manager.
   *
   * @returns true if the context manager was successfully registered, else false
   */
  setGlobalContextManager(contextManager) {
    return registerGlobal(API_NAME$1, contextManager, DiagAPI.instance());
  }
  /**
   * Get the currently active context
   */
  active() {
    return this._getContextManager().active();
  }
  /**
   * Execute a function with an active context
   *
   * @param context context to be active during function execution
   * @param fn function to execute in a context
   * @param thisArg optional receiver to be used for calling fn
   * @param args optional arguments forwarded to fn
   */
  with(context2, fn, thisArg, ...args) {
    return this._getContextManager().with(context2, fn, thisArg, ...args);
  }
  /**
   * Bind a context to a target function or event emitter
   *
   * @param context context to bind to the event emitter or function. Defaults to the currently active context
   * @param target function or event emitter to bind
   */
  bind(context2, target) {
    return this._getContextManager().bind(context2, target);
  }
  _getContextManager() {
    return getGlobal(API_NAME$1) || NOOP_CONTEXT_MANAGER;
  }
  /** Disable and remove the global context manager */
  disable() {
    this._getContextManager().disable();
    unregisterGlobal(API_NAME$1, DiagAPI.instance());
  }
}
var TraceFlags;
(function(TraceFlags2) {
  TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
  TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
})(TraceFlags || (TraceFlags = {}));
const INVALID_SPANID = "0000000000000000";
const INVALID_TRACEID = "00000000000000000000000000000000";
const INVALID_SPAN_CONTEXT = {
  traceId: INVALID_TRACEID,
  spanId: INVALID_SPANID,
  traceFlags: TraceFlags.NONE
};
class NonRecordingSpan {
  constructor(spanContext = INVALID_SPAN_CONTEXT) {
    this._spanContext = spanContext;
  }
  // Returns a SpanContext.
  spanContext() {
    return this._spanContext;
  }
  // By default does nothing
  setAttribute(_key, _value) {
    return this;
  }
  // By default does nothing
  setAttributes(_attributes) {
    return this;
  }
  // By default does nothing
  addEvent(_name, _attributes) {
    return this;
  }
  addLink(_link) {
    return this;
  }
  addLinks(_links) {
    return this;
  }
  // By default does nothing
  setStatus(_status) {
    return this;
  }
  // By default does nothing
  updateName(_name) {
    return this;
  }
  // By default does nothing
  end(_endTime) {
  }
  // isRecording always returns false for NonRecordingSpan.
  isRecording() {
    return false;
  }
  // By default does nothing
  recordException(_exception, _time) {
  }
}
const SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
function getSpan(context2) {
  return context2.getValue(SPAN_KEY) || void 0;
}
function getActiveSpan() {
  return getSpan(ContextAPI.getInstance().active());
}
function setSpan(context2, span) {
  return context2.setValue(SPAN_KEY, span);
}
function deleteSpan(context2) {
  return context2.deleteValue(SPAN_KEY);
}
function setSpanContext(context2, spanContext) {
  return setSpan(context2, new NonRecordingSpan(spanContext));
}
function getSpanContext(context2) {
  var _a10;
  return (_a10 = getSpan(context2)) === null || _a10 === void 0 ? void 0 : _a10.spanContext();
}
const isHex = new Uint8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1
]);
function isValidHex(id, length) {
  if (typeof id !== "string" || id.length !== length)
    return false;
  let r = 0;
  for (let i = 0; i < id.length; i += 4) {
    r += (isHex[id.charCodeAt(i)] | 0) + (isHex[id.charCodeAt(i + 1)] | 0) + (isHex[id.charCodeAt(i + 2)] | 0) + (isHex[id.charCodeAt(i + 3)] | 0);
  }
  return r === length;
}
function isValidTraceId(traceId) {
  return isValidHex(traceId, 32) && traceId !== INVALID_TRACEID;
}
function isValidSpanId(spanId) {
  return isValidHex(spanId, 16) && spanId !== INVALID_SPANID;
}
function isSpanContextValid(spanContext) {
  return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
  return new NonRecordingSpan(spanContext);
}
const contextApi = ContextAPI.getInstance();
class NoopTracer {
  // startSpan starts a noop span.
  startSpan(name10, options, context2 = contextApi.active()) {
    const root = Boolean(options === null || options === void 0 ? void 0 : options.root);
    if (root) {
      return new NonRecordingSpan();
    }
    const parentFromContext = context2 && getSpanContext(context2);
    if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
      return new NonRecordingSpan(parentFromContext);
    } else {
      return new NonRecordingSpan();
    }
  }
  startActiveSpan(name10, arg2, arg3, arg4) {
    let opts;
    let ctx;
    let fn;
    if (arguments.length < 2) {
      return;
    } else if (arguments.length === 2) {
      fn = arg2;
    } else if (arguments.length === 3) {
      opts = arg2;
      fn = arg3;
    } else {
      opts = arg2;
      ctx = arg3;
      fn = arg4;
    }
    const parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
    const span = this.startSpan(name10, opts, parentContext);
    const contextWithSpanSet = setSpan(parentContext, span);
    return contextApi.with(contextWithSpanSet, fn, void 0, span);
  }
}
function isSpanContext(spanContext) {
  return spanContext !== null && typeof spanContext === "object" && "spanId" in spanContext && typeof spanContext["spanId"] === "string" && "traceId" in spanContext && typeof spanContext["traceId"] === "string" && "traceFlags" in spanContext && typeof spanContext["traceFlags"] === "number";
}
const NOOP_TRACER = new NoopTracer();
class ProxyTracer {
  constructor(provider, name10, version2, options) {
    this._provider = provider;
    this.name = name10;
    this.version = version2;
    this.options = options;
  }
  startSpan(name10, options, context2) {
    return this._getTracer().startSpan(name10, options, context2);
  }
  startActiveSpan(_name, _options, _context, _fn) {
    const tracer = this._getTracer();
    return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
  }
  /**
   * Try to get a tracer from the proxy tracer provider.
   * If the proxy tracer provider has no delegate, return a noop tracer.
   */
  _getTracer() {
    if (this._delegate) {
      return this._delegate;
    }
    const tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
    if (!tracer) {
      return NOOP_TRACER;
    }
    this._delegate = tracer;
    return this._delegate;
  }
}
class NoopTracerProvider {
  getTracer(_name, _version, _options) {
    return new NoopTracer();
  }
}
const NOOP_TRACER_PROVIDER = new NoopTracerProvider();
class ProxyTracerProvider {
  /**
   * Get a {@link ProxyTracer}
   */
  getTracer(name10, version2, options) {
    var _a10;
    return (_a10 = this.getDelegateTracer(name10, version2, options)) !== null && _a10 !== void 0 ? _a10 : new ProxyTracer(this, name10, version2, options);
  }
  getDelegate() {
    var _a10;
    return (_a10 = this._delegate) !== null && _a10 !== void 0 ? _a10 : NOOP_TRACER_PROVIDER;
  }
  /**
   * Set the delegate tracer provider
   */
  setDelegate(delegate) {
    this._delegate = delegate;
  }
  getDelegateTracer(name10, version2, options) {
    var _a10;
    return (_a10 = this._delegate) === null || _a10 === void 0 ? void 0 : _a10.getTracer(name10, version2, options);
  }
}
var SpanStatusCode;
(function(SpanStatusCode2) {
  SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
  SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
  SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
})(SpanStatusCode || (SpanStatusCode = {}));
const context = ContextAPI.getInstance();
const API_NAME = "trace";
class TraceAPI {
  /** Empty private constructor prevents end users from constructing a new instance of the API */
  constructor() {
    this._proxyTracerProvider = new ProxyTracerProvider();
    this.wrapSpanContext = wrapSpanContext;
    this.isSpanContextValid = isSpanContextValid;
    this.deleteSpan = deleteSpan;
    this.getSpan = getSpan;
    this.getActiveSpan = getActiveSpan;
    this.getSpanContext = getSpanContext;
    this.setSpan = setSpan;
    this.setSpanContext = setSpanContext;
  }
  /** Get the singleton instance of the Trace API */
  static getInstance() {
    if (!this._instance) {
      this._instance = new TraceAPI();
    }
    return this._instance;
  }
  /**
   * Set the current global tracer.
   *
   * @returns true if the tracer provider was successfully registered, else false
   */
  setGlobalTracerProvider(provider) {
    const success = registerGlobal(API_NAME, this._proxyTracerProvider, DiagAPI.instance());
    if (success) {
      this._proxyTracerProvider.setDelegate(provider);
    }
    return success;
  }
  /**
   * Returns the global tracer provider.
   */
  getTracerProvider() {
    return getGlobal(API_NAME) || this._proxyTracerProvider;
  }
  /**
   * Returns a tracer from the global tracer provider.
   */
  getTracer(name10, version2) {
    return this.getTracerProvider().getTracer(name10, version2);
  }
  /** Remove the global tracer provider */
  disable() {
    unregisterGlobal(API_NAME, DiagAPI.instance());
    this._proxyTracerProvider = new ProxyTracerProvider();
  }
}
const trace = TraceAPI.getInstance();
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name21 in all)
    __defProp(target, name21, { get: all[name21], enumerable: true });
};
var name = "AI_InvalidArgumentError";
var marker = `vercel.ai.error.${name}`;
var symbol = Symbol.for(marker);
var _a;
var InvalidArgumentError2 = class extends AISDKError {
  constructor({
    parameter,
    value,
    message
  }) {
    super({
      name,
      message: `Invalid argument for parameter ${parameter}: ${message}`
    });
    this[_a] = true;
    this.parameter = parameter;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker);
  }
};
_a = symbol;
var name3 = "AI_InvalidToolApprovalError";
var marker3 = `vercel.ai.error.${name3}`;
var symbol3 = Symbol.for(marker3);
var _a3;
var InvalidToolApprovalError = class extends AISDKError {
  constructor({ approvalId }) {
    super({
      name: name3,
      message: `Tool approval response references unknown approvalId: "${approvalId}". No matching tool-approval-request found in message history.`
    });
    this[_a3] = true;
    this.approvalId = approvalId;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker3);
  }
};
_a3 = symbol3;
var name4 = "AI_InvalidToolInputError";
var marker4 = `vercel.ai.error.${name4}`;
var symbol4 = Symbol.for(marker4);
var _a4;
var InvalidToolInputError = class extends AISDKError {
  constructor({
    toolInput,
    toolName,
    cause,
    message = `Invalid input for tool ${toolName}: ${getErrorMessage$1(cause)}`
  }) {
    super({ name: name4, message, cause });
    this[_a4] = true;
    this.toolInput = toolInput;
    this.toolName = toolName;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker4);
  }
};
_a4 = symbol4;
var name5 = "AI_ToolCallNotFoundForApprovalError";
var marker5 = `vercel.ai.error.${name5}`;
var symbol5 = Symbol.for(marker5);
var _a5;
var ToolCallNotFoundForApprovalError = class extends AISDKError {
  constructor({
    toolCallId,
    approvalId
  }) {
    super({
      name: name5,
      message: `Tool call "${toolCallId}" not found for approval request "${approvalId}".`
    });
    this[_a5] = true;
    this.toolCallId = toolCallId;
    this.approvalId = approvalId;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker5);
  }
};
_a5 = symbol5;
var name6 = "AI_MissingToolResultsError";
var marker6 = `vercel.ai.error.${name6}`;
var symbol6 = Symbol.for(marker6);
var _a6;
var MissingToolResultsError = class extends AISDKError {
  constructor({ toolCallIds }) {
    super({
      name: name6,
      message: `Tool result${toolCallIds.length > 1 ? "s are" : " is"} missing for tool call${toolCallIds.length > 1 ? "s" : ""} ${toolCallIds.join(
        ", "
      )}.`
    });
    this[_a6] = true;
    this.toolCallIds = toolCallIds;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker6);
  }
};
_a6 = symbol6;
var name8 = "AI_NoObjectGeneratedError";
var marker8 = `vercel.ai.error.${name8}`;
var symbol8 = Symbol.for(marker8);
var _a8;
var NoObjectGeneratedError = class extends AISDKError {
  constructor({
    message = "No object generated.",
    cause,
    text: text2,
    response,
    usage,
    finishReason
  }) {
    super({ name: name8, message, cause });
    this[_a8] = true;
    this.text = text2;
    this.response = response;
    this.usage = usage;
    this.finishReason = finishReason;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker8);
  }
};
_a8 = symbol8;
var name9 = "AI_NoOutputGeneratedError";
var marker9 = `vercel.ai.error.${name9}`;
var symbol9 = Symbol.for(marker9);
var _a9;
var NoOutputGeneratedError = class extends AISDKError {
  // used in isInstance
  constructor({
    message = "No output generated.",
    cause
  } = {}) {
    super({ name: name9, message, cause });
    this[_a9] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker9);
  }
};
_a9 = symbol9;
var name13 = "AI_NoSuchToolError";
var marker13 = `vercel.ai.error.${name13}`;
var symbol13 = Symbol.for(marker13);
var _a13;
var NoSuchToolError = class extends AISDKError {
  constructor({
    toolName,
    availableTools = void 0,
    message = `Model tried to call unavailable tool '${toolName}'. ${availableTools === void 0 ? "No tools are available." : `Available tools: ${availableTools.join(", ")}.`}`
  }) {
    super({ name: name13, message });
    this[_a13] = true;
    this.toolName = toolName;
    this.availableTools = availableTools;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker13);
  }
};
_a13 = symbol13;
var name14 = "AI_ToolCallRepairError";
var marker14 = `vercel.ai.error.${name14}`;
var symbol14 = Symbol.for(marker14);
var _a14;
var ToolCallRepairError = class extends AISDKError {
  constructor({
    cause,
    originalError,
    message = `Error repairing tool call: ${getErrorMessage$1(cause)}`
  }) {
    super({ name: name14, message, cause });
    this[_a14] = true;
    this.originalError = originalError;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker14);
  }
};
_a14 = symbol14;
var UnsupportedModelVersionError = class extends AISDKError {
  constructor(options) {
    super({
      name: "AI_UnsupportedModelVersionError",
      message: `Unsupported model version ${options.version} for provider "${options.provider}" and model "${options.modelId}". AI SDK 5 only supports models that implement specification version "v2".`
    });
    this.version = options.version;
    this.provider = options.provider;
    this.modelId = options.modelId;
  }
};
var name15 = "AI_UIMessageStreamError";
var marker15 = `vercel.ai.error.${name15}`;
var symbol15 = Symbol.for(marker15);
var _a15;
var UIMessageStreamError = class extends AISDKError {
  constructor({
    chunkType,
    chunkId,
    message
  }) {
    super({ name: name15, message });
    this[_a15] = true;
    this.chunkType = chunkType;
    this.chunkId = chunkId;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker15);
  }
};
_a15 = symbol15;
var name17 = "AI_InvalidMessageRoleError";
var marker17 = `vercel.ai.error.${name17}`;
var symbol17 = Symbol.for(marker17);
var _a17;
var InvalidMessageRoleError = class extends AISDKError {
  constructor({
    role,
    message = `Invalid message role: '${role}'. Must be one of: "system", "user", "assistant", "tool".`
  }) {
    super({ name: name17, message });
    this[_a17] = true;
    this.role = role;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker17);
  }
};
_a17 = symbol17;
var name18 = "AI_MessageConversionError";
var marker18 = `vercel.ai.error.${name18}`;
var symbol18 = Symbol.for(marker18);
var _a18;
var MessageConversionError = class extends AISDKError {
  constructor({
    originalMessage,
    message
  }) {
    super({ name: name18, message });
    this[_a18] = true;
    this.originalMessage = originalMessage;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker18);
  }
};
_a18 = symbol18;
var name19 = "AI_RetryError";
var marker19 = `vercel.ai.error.${name19}`;
var symbol19 = Symbol.for(marker19);
var _a19;
var RetryError = class extends AISDKError {
  constructor({
    message,
    reason,
    errors
  }) {
    super({ name: name19, message });
    this[_a19] = true;
    this.reason = reason;
    this.errors = errors;
    this.lastError = errors[errors.length - 1];
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker19);
  }
};
_a19 = symbol19;
function asArray(value) {
  return value === void 0 ? [] : Array.isArray(value) ? value : [value];
}
async function notify(options) {
  for (const callback of asArray(options.callbacks)) {
    if (callback == null)
      continue;
    try {
      await callback(options.event);
    } catch (_ignored) {
    }
  }
}
function formatWarning({
  warning,
  provider,
  model
}) {
  const prefix = `AI SDK Warning (${provider} / ${model}):`;
  switch (warning.type) {
    case "unsupported": {
      let message = `${prefix} The feature "${warning.feature}" is not supported.`;
      if (warning.details) {
        message += ` ${warning.details}`;
      }
      return message;
    }
    case "compatibility": {
      let message = `${prefix} The feature "${warning.feature}" is used in a compatibility mode.`;
      if (warning.details) {
        message += ` ${warning.details}`;
      }
      return message;
    }
    case "other": {
      return `${prefix} ${warning.message}`;
    }
    default: {
      return `${prefix} ${JSON.stringify(warning, null, 2)}`;
    }
  }
}
var FIRST_WARNING_INFO_MESSAGE = "AI SDK Warning System: To turn off warning logging, set the AI_SDK_LOG_WARNINGS global to false.";
var hasLoggedBefore = false;
var logWarnings = (options) => {
  if (options.warnings.length === 0) {
    return;
  }
  const logger = globalThis.AI_SDK_LOG_WARNINGS;
  if (logger === false) {
    return;
  }
  if (typeof logger === "function") {
    logger(options);
    return;
  }
  if (!hasLoggedBefore) {
    hasLoggedBefore = true;
    console.info(FIRST_WARNING_INFO_MESSAGE);
  }
  for (const warning of options.warnings) {
    console.warn(
      formatWarning({
        warning,
        provider: options.provider,
        model: options.model
      })
    );
  }
};
function logV2CompatibilityWarning({
  provider,
  modelId
}) {
  logWarnings({
    warnings: [
      {
        type: "compatibility",
        feature: "specificationVersion",
        details: `Using v2 specification compatibility mode. Some features may not be available.`
      }
    ],
    provider,
    model: modelId
  });
}
function asLanguageModelV3(model) {
  if (model.specificationVersion === "v3") {
    return model;
  }
  logV2CompatibilityWarning({
    provider: model.provider,
    modelId: model.modelId
  });
  return new Proxy(model, {
    get(target, prop) {
      switch (prop) {
        case "specificationVersion":
          return "v3";
        case "doGenerate":
          return async (...args) => {
            const result = await target.doGenerate(...args);
            return {
              ...result,
              finishReason: convertV2FinishReasonToV3(result.finishReason),
              usage: convertV2UsageToV3(result.usage)
            };
          };
        case "doStream":
          return async (...args) => {
            const result = await target.doStream(...args);
            return {
              ...result,
              stream: convertV2StreamToV3(result.stream)
            };
          };
        default:
          return target[prop];
      }
    }
  });
}
function convertV2StreamToV3(stream) {
  return stream.pipeThrough(
    new TransformStream({
      transform(chunk, controller) {
        switch (chunk.type) {
          case "finish":
            controller.enqueue({
              ...chunk,
              finishReason: convertV2FinishReasonToV3(chunk.finishReason),
              usage: convertV2UsageToV3(chunk.usage)
            });
            break;
          default:
            controller.enqueue(chunk);
            break;
        }
      }
    })
  );
}
function convertV2FinishReasonToV3(finishReason) {
  return {
    unified: finishReason === "unknown" ? "other" : finishReason,
    raw: void 0
  };
}
function convertV2UsageToV3(usage) {
  return {
    inputTokens: {
      total: usage.inputTokens,
      noCache: void 0,
      cacheRead: usage.cachedInputTokens,
      cacheWrite: void 0
    },
    outputTokens: {
      total: usage.outputTokens,
      text: void 0,
      reasoning: usage.reasoningTokens
    }
  };
}
function resolveLanguageModel(model) {
  if (typeof model !== "string") {
    if (model.specificationVersion !== "v3" && model.specificationVersion !== "v2") {
      const unsupportedModel = model;
      throw new UnsupportedModelVersionError({
        version: unsupportedModel.specificationVersion,
        provider: unsupportedModel.provider,
        modelId: unsupportedModel.modelId
      });
    }
    return asLanguageModelV3(model);
  }
  return getGlobalProvider().languageModel(model);
}
function getGlobalProvider() {
  var _a21;
  return (_a21 = globalThis.AI_SDK_DEFAULT_PROVIDER) != null ? _a21 : gateway;
}
function getTotalTimeoutMs(timeout) {
  if (timeout == null) {
    return void 0;
  }
  if (typeof timeout === "number") {
    return timeout;
  }
  return timeout.totalMs;
}
function getStepTimeoutMs(timeout) {
  if (timeout == null || typeof timeout === "number") {
    return void 0;
  }
  return timeout.stepMs;
}
function getChunkTimeoutMs(timeout) {
  if (timeout == null || typeof timeout === "number") {
    return void 0;
  }
  return timeout.chunkMs;
}
var imageMediaTypeSignatures = [
  {
    mediaType: "image/gif",
    bytesPrefix: [71, 73, 70]
    // GIF
  },
  {
    mediaType: "image/png",
    bytesPrefix: [137, 80, 78, 71]
    // PNG
  },
  {
    mediaType: "image/jpeg",
    bytesPrefix: [255, 216]
    // JPEG
  },
  {
    mediaType: "image/webp",
    bytesPrefix: [
      82,
      73,
      70,
      70,
      // "RIFF"
      null,
      null,
      null,
      null,
      // file size (variable)
      87,
      69,
      66,
      80
      // "WEBP"
    ]
  },
  {
    mediaType: "image/bmp",
    bytesPrefix: [66, 77]
  },
  {
    mediaType: "image/tiff",
    bytesPrefix: [73, 73, 42, 0]
  },
  {
    mediaType: "image/tiff",
    bytesPrefix: [77, 77, 0, 42]
  },
  {
    mediaType: "image/avif",
    bytesPrefix: [
      0,
      0,
      0,
      32,
      102,
      116,
      121,
      112,
      97,
      118,
      105,
      102
    ]
  },
  {
    mediaType: "image/heic",
    bytesPrefix: [
      0,
      0,
      0,
      32,
      102,
      116,
      121,
      112,
      104,
      101,
      105,
      99
    ]
  }
];
var stripID3 = (data) => {
  const bytes = typeof data === "string" ? convertBase64ToUint8Array(data) : data;
  const id3Size = (bytes[6] & 127) << 21 | (bytes[7] & 127) << 14 | (bytes[8] & 127) << 7 | bytes[9] & 127;
  return bytes.slice(id3Size + 10);
};
function stripID3TagsIfPresent(data) {
  const hasId3 = typeof data === "string" && data.startsWith("SUQz") || typeof data !== "string" && data.length > 10 && data[0] === 73 && // 'I'
  data[1] === 68 && // 'D'
  data[2] === 51;
  return hasId3 ? stripID3(data) : data;
}
function detectMediaType({
  data,
  signatures
}) {
  const processedData = stripID3TagsIfPresent(data);
  const bytes = typeof processedData === "string" ? convertBase64ToUint8Array(
    processedData.substring(0, Math.min(processedData.length, 24))
  ) : processedData;
  for (const signature of signatures) {
    if (bytes.length >= signature.bytesPrefix.length && signature.bytesPrefix.every(
      (byte, index) => byte === null || bytes[index] === byte
    )) {
      return signature.mediaType;
    }
  }
  return void 0;
}
var VERSION$1 = "6.0.188";
var download = async ({
  url,
  maxBytes,
  abortSignal
}) => {
  var _a21;
  const urlText = url.toString();
  validateDownloadUrl(urlText);
  try {
    const response = await fetch(urlText, {
      headers: withUserAgentSuffix(
        {},
        `ai-sdk/${VERSION$1}`,
        getRuntimeEnvironmentUserAgent()
      ),
      signal: abortSignal
    });
    if (response.redirected) {
      validateDownloadUrl(response.url);
    }
    if (!response.ok) {
      throw new DownloadError({
        url: urlText,
        statusCode: response.status,
        statusText: response.statusText
      });
    }
    const data = await readResponseWithSizeLimit({
      response,
      url: urlText,
      maxBytes: maxBytes != null ? maxBytes : DEFAULT_MAX_DOWNLOAD_SIZE
    });
    return {
      data,
      mediaType: (_a21 = response.headers.get("content-type")) != null ? _a21 : void 0
    };
  } catch (error) {
    if (DownloadError.isInstance(error)) {
      throw error;
    }
    throw new DownloadError({ url: urlText, cause: error });
  }
};
var createDefaultDownloadFunction = (download2 = download) => (requestedDownloads) => Promise.all(
  requestedDownloads.map(
    async (requestedDownload) => requestedDownload.isUrlSupportedByModel ? null : download2(requestedDownload)
  )
);
function splitDataUrl(dataUrl) {
  try {
    const [header, base64Content] = dataUrl.split(",");
    return {
      mediaType: header.split(";")[0].split(":")[1],
      base64Content
    };
  } catch (error) {
    return {
      mediaType: void 0,
      base64Content: void 0
    };
  }
}
var dataContentSchema = union([
  string(),
  _instanceof(Uint8Array),
  _instanceof(ArrayBuffer),
  custom(
    // Buffer might not be available in some environments such as CloudFlare:
    (value) => {
      var _a21, _b9;
      return (_b9 = (_a21 = globalThis.Buffer) == null ? void 0 : _a21.isBuffer(value)) != null ? _b9 : false;
    },
    { message: "Must be a Buffer" }
  )
]);
function convertToLanguageModelV3DataContent(content) {
  if (content instanceof Uint8Array) {
    return { data: content, mediaType: void 0 };
  }
  if (content instanceof ArrayBuffer) {
    return { data: new Uint8Array(content), mediaType: void 0 };
  }
  if (typeof content === "string") {
    try {
      content = new URL(content);
    } catch (error) {
    }
  }
  if (content instanceof URL && content.protocol === "data:") {
    const { mediaType: dataUrlMediaType, base64Content } = splitDataUrl(
      content.toString()
    );
    if (dataUrlMediaType == null || base64Content == null) {
      throw new AISDKError({
        name: "InvalidDataContentError",
        message: `Invalid data URL format in content ${content.toString()}`
      });
    }
    return { data: base64Content, mediaType: dataUrlMediaType };
  }
  return { data: content, mediaType: void 0 };
}
function convertDataContentToBase64String(content) {
  if (typeof content === "string") {
    return content;
  }
  if (content instanceof ArrayBuffer) {
    return convertUint8ArrayToBase64(new Uint8Array(content));
  }
  return convertUint8ArrayToBase64(content);
}
async function convertToLanguageModelPrompt({
  prompt,
  supportedUrls,
  download: download2 = createDefaultDownloadFunction()
}) {
  const downloadedAssets = await downloadAssets(
    prompt.messages,
    download2,
    supportedUrls
  );
  const approvalIdToToolCallId = /* @__PURE__ */ new Map();
  for (const message of prompt.messages) {
    if (message.role === "assistant" && Array.isArray(message.content)) {
      for (const part of message.content) {
        if (part.type === "tool-approval-request" && "approvalId" in part && "toolCallId" in part) {
          approvalIdToToolCallId.set(
            part.approvalId,
            part.toolCallId
          );
        }
      }
    }
  }
  const approvedToolCallIds = /* @__PURE__ */ new Set();
  for (const message of prompt.messages) {
    if (message.role === "tool") {
      for (const part of message.content) {
        if (part.type === "tool-approval-response") {
          const toolCallId = approvalIdToToolCallId.get(part.approvalId);
          if (toolCallId) {
            approvedToolCallIds.add(toolCallId);
          }
        }
      }
    }
  }
  const messages = [
    ...prompt.system != null ? typeof prompt.system === "string" ? [{ role: "system", content: prompt.system }] : asArray(prompt.system).map((message) => ({
      role: "system",
      content: message.content,
      providerOptions: message.providerOptions
    })) : [],
    ...prompt.messages.map(
      (message) => convertToLanguageModelMessage({ message, downloadedAssets })
    )
  ];
  const combinedMessages = [];
  for (const message of messages) {
    if (message.role !== "tool") {
      combinedMessages.push(message);
      continue;
    }
    const lastCombinedMessage = combinedMessages.at(-1);
    if ((lastCombinedMessage == null ? void 0 : lastCombinedMessage.role) === "tool") {
      lastCombinedMessage.content.push(...message.content);
    } else {
      combinedMessages.push(message);
    }
  }
  const toolCallIds = /* @__PURE__ */ new Set();
  for (const message of combinedMessages) {
    switch (message.role) {
      case "assistant": {
        for (const content of message.content) {
          if (content.type === "tool-call" && !content.providerExecuted) {
            toolCallIds.add(content.toolCallId);
          }
        }
        break;
      }
      case "tool": {
        for (const content of message.content) {
          if (content.type === "tool-result") {
            toolCallIds.delete(content.toolCallId);
          }
        }
        break;
      }
      case "user":
      case "system":
        for (const id of approvedToolCallIds) {
          toolCallIds.delete(id);
        }
        if (toolCallIds.size > 0) {
          throw new MissingToolResultsError({
            toolCallIds: Array.from(toolCallIds)
          });
        }
        break;
    }
  }
  for (const id of approvedToolCallIds) {
    toolCallIds.delete(id);
  }
  if (toolCallIds.size > 0) {
    throw new MissingToolResultsError({ toolCallIds: Array.from(toolCallIds) });
  }
  return combinedMessages.filter(
    // Filter out empty tool messages (e.g. if they only contained
    // tool-approval-response parts that were removed).
    // This prevents sending invalid empty messages to the provider.
    // Note: provider-executed tool-approval-response parts are preserved.
    (message) => message.role !== "tool" || message.content.length > 0
  );
}
function convertToLanguageModelMessage({
  message,
  downloadedAssets
}) {
  const role = message.role;
  switch (role) {
    case "system": {
      return {
        role: "system",
        content: message.content,
        providerOptions: message.providerOptions
      };
    }
    case "user": {
      if (typeof message.content === "string") {
        return {
          role: "user",
          content: [{ type: "text", text: message.content }],
          providerOptions: message.providerOptions
        };
      }
      return {
        role: "user",
        content: message.content.map((part) => convertPartToLanguageModelPart(part, downloadedAssets)).filter((part) => part.type !== "text" || part.text !== ""),
        providerOptions: message.providerOptions
      };
    }
    case "assistant": {
      if (typeof message.content === "string") {
        return {
          role: "assistant",
          content: [{ type: "text", text: message.content }],
          providerOptions: message.providerOptions
        };
      }
      return {
        role: "assistant",
        content: message.content.filter(
          // remove empty text parts (no text, and no provider options):
          (part) => part.type !== "text" || part.text !== "" || part.providerOptions != null
        ).filter(
          (part) => part.type !== "tool-approval-request"
        ).map((part) => {
          const providerOptions = part.providerOptions;
          switch (part.type) {
            case "file": {
              const { data, mediaType } = convertToLanguageModelV3DataContent(
                part.data
              );
              return {
                type: "file",
                data,
                filename: part.filename,
                mediaType: mediaType != null ? mediaType : part.mediaType,
                providerOptions
              };
            }
            case "reasoning": {
              return {
                type: "reasoning",
                text: part.text,
                providerOptions
              };
            }
            case "text": {
              return {
                type: "text",
                text: part.text,
                providerOptions
              };
            }
            case "tool-call": {
              return {
                type: "tool-call",
                toolCallId: part.toolCallId,
                toolName: part.toolName,
                input: part.input,
                providerExecuted: part.providerExecuted,
                providerOptions
              };
            }
            case "tool-result": {
              return {
                type: "tool-result",
                toolCallId: part.toolCallId,
                toolName: part.toolName,
                output: mapToolResultOutput({
                  output: part.output,
                  downloadedAssets
                }),
                providerOptions
              };
            }
          }
        }),
        providerOptions: message.providerOptions
      };
    }
    case "tool": {
      return {
        role: "tool",
        content: message.content.filter(
          // Only include tool-approval-response for provider-executed tools
          (part) => part.type !== "tool-approval-response" || part.providerExecuted
        ).map((part) => {
          switch (part.type) {
            case "tool-result": {
              return {
                type: "tool-result",
                toolCallId: part.toolCallId,
                toolName: part.toolName,
                output: mapToolResultOutput({
                  output: part.output,
                  downloadedAssets
                }),
                providerOptions: part.providerOptions
              };
            }
            case "tool-approval-response": {
              return {
                type: "tool-approval-response",
                approvalId: part.approvalId,
                approved: part.approved,
                reason: part.reason
              };
            }
          }
        }),
        providerOptions: message.providerOptions
      };
    }
    default: {
      const _exhaustiveCheck = role;
      throw new InvalidMessageRoleError({ role: _exhaustiveCheck });
    }
  }
}
async function downloadAssets(messages, download2, supportedUrls) {
  var _a21;
  const downloadableFiles = [];
  for (const message of messages) {
    if (message.role === "user" && Array.isArray(message.content)) {
      for (const part of message.content) {
        if (part.type === "image" || part.type === "file") {
          downloadableFiles.push({
            data: part.type === "image" ? part.image : part.data,
            mediaType: (_a21 = part.mediaType) != null ? _a21 : part.type === "image" ? "image/*" : void 0
          });
        }
      }
    }
    if (message.role === "tool" || message.role === "assistant") {
      if (!Array.isArray(message.content)) {
        continue;
      }
      for (const part of message.content) {
        if (part.type !== "tool-result") {
          continue;
        }
        if (part.output.type !== "content") {
          continue;
        }
        for (const contentPart of part.output.value) {
          if (contentPart.type === "image-url" || contentPart.type === "file-url") {
            downloadableFiles.push({
              data: new URL(contentPart.url),
              mediaType: contentPart.type === "image-url" ? "image/*" : void 0
            });
          }
        }
      }
    }
  }
  const plannedDownloads = downloadableFiles.map((part) => {
    const mediaType = part.mediaType;
    const { data } = convertToLanguageModelV3DataContent(part.data);
    return { mediaType, data };
  }).filter(
    (part) => part.data instanceof URL
  ).map((part) => ({
    url: part.data,
    isUrlSupportedByModel: part.mediaType != null && isUrlSupported({
      url: part.data.toString(),
      mediaType: part.mediaType,
      supportedUrls
    })
  }));
  const downloadedFiles = await download2(plannedDownloads);
  return Object.fromEntries(
    downloadedFiles.map(
      (file, index) => file == null ? null : [
        plannedDownloads[index].url.toString(),
        { data: file.data, mediaType: file.mediaType }
      ]
    ).filter((file) => file != null)
  );
}
function convertPartToLanguageModelPart(part, downloadedAssets) {
  var _a21;
  if (part.type === "text") {
    return {
      type: "text",
      text: part.text,
      providerOptions: part.providerOptions
    };
  }
  let originalData;
  const type = part.type;
  switch (type) {
    case "image":
      originalData = part.image;
      break;
    case "file":
      originalData = part.data;
      break;
    default:
      throw new Error(`Unsupported part type: ${type}`);
  }
  const { data: convertedData, mediaType: convertedMediaType } = convertToLanguageModelV3DataContent(originalData);
  let mediaType = convertedMediaType != null ? convertedMediaType : part.mediaType;
  let data = convertedData;
  if (data instanceof URL) {
    const downloadedFile = downloadedAssets[data.toString()];
    if (downloadedFile) {
      data = downloadedFile.data;
      mediaType != null ? mediaType : mediaType = downloadedFile.mediaType;
    }
  }
  switch (type) {
    case "image": {
      if (data instanceof Uint8Array || typeof data === "string") {
        mediaType = (_a21 = detectMediaType({ data, signatures: imageMediaTypeSignatures })) != null ? _a21 : mediaType;
      }
      return {
        type: "file",
        mediaType: mediaType != null ? mediaType : "image/*",
        // any image
        filename: void 0,
        data,
        providerOptions: part.providerOptions
      };
    }
    case "file": {
      if (mediaType == null) {
        throw new Error(`Media type is missing for file part`);
      }
      return {
        type: "file",
        mediaType,
        filename: part.filename,
        data,
        providerOptions: part.providerOptions
      };
    }
  }
}
function mapToolResultOutput({
  output,
  downloadedAssets
}) {
  if (output.type !== "content") {
    return output;
  }
  return {
    type: "content",
    value: output.value.map((item) => {
      var _a21, _b9;
      if (item.type === "image-url") {
        const downloadedFile = downloadedAssets[new URL(item.url).toString()];
        if (downloadedFile) {
          return {
            type: "image-data",
            data: convertDataContentToBase64String(downloadedFile.data),
            mediaType: (_a21 = downloadedFile.mediaType) != null ? _a21 : "image/*",
            providerOptions: item.providerOptions
          };
        }
        return item;
      }
      if (item.type === "file-url") {
        const downloadedFile = downloadedAssets[new URL(item.url).toString()];
        if (downloadedFile) {
          return {
            type: "file-data",
            data: convertDataContentToBase64String(downloadedFile.data),
            mediaType: (_b9 = downloadedFile.mediaType) != null ? _b9 : "application/octet-stream",
            providerOptions: item.providerOptions
          };
        }
        return item;
      }
      if (item.type !== "media") {
        return item;
      }
      if (item.mediaType.startsWith("image/")) {
        return {
          type: "image-data",
          data: item.data,
          mediaType: item.mediaType
        };
      }
      return {
        type: "file-data",
        data: item.data,
        mediaType: item.mediaType
      };
    })
  };
}
async function createToolModelOutput({
  toolCallId,
  input,
  output,
  tool: tool2,
  errorMode
}) {
  if (errorMode === "text") {
    return { type: "error-text", value: getErrorMessage$1(output) };
  } else if (errorMode === "json") {
    return { type: "error-json", value: toJSONValue(output) };
  }
  if (tool2 == null ? void 0 : tool2.toModelOutput) {
    return await tool2.toModelOutput({ toolCallId, input, output });
  }
  return typeof output === "string" ? { type: "text", value: output } : { type: "json", value: toJSONValue(output) };
}
function toJSONValue(value) {
  return value === void 0 ? null : value;
}
function prepareCallSettings({
  maxOutputTokens,
  temperature,
  topP,
  topK,
  presencePenalty,
  frequencyPenalty,
  seed,
  stopSequences
}) {
  if (maxOutputTokens != null) {
    if (!Number.isInteger(maxOutputTokens)) {
      throw new InvalidArgumentError2({
        parameter: "maxOutputTokens",
        value: maxOutputTokens,
        message: "maxOutputTokens must be an integer"
      });
    }
    if (maxOutputTokens < 1) {
      throw new InvalidArgumentError2({
        parameter: "maxOutputTokens",
        value: maxOutputTokens,
        message: "maxOutputTokens must be >= 1"
      });
    }
  }
  if (temperature != null) {
    if (typeof temperature !== "number") {
      throw new InvalidArgumentError2({
        parameter: "temperature",
        value: temperature,
        message: "temperature must be a number"
      });
    }
  }
  if (topP != null) {
    if (typeof topP !== "number") {
      throw new InvalidArgumentError2({
        parameter: "topP",
        value: topP,
        message: "topP must be a number"
      });
    }
  }
  if (topK != null) {
    if (typeof topK !== "number") {
      throw new InvalidArgumentError2({
        parameter: "topK",
        value: topK,
        message: "topK must be a number"
      });
    }
  }
  if (presencePenalty != null) {
    if (typeof presencePenalty !== "number") {
      throw new InvalidArgumentError2({
        parameter: "presencePenalty",
        value: presencePenalty,
        message: "presencePenalty must be a number"
      });
    }
  }
  if (frequencyPenalty != null) {
    if (typeof frequencyPenalty !== "number") {
      throw new InvalidArgumentError2({
        parameter: "frequencyPenalty",
        value: frequencyPenalty,
        message: "frequencyPenalty must be a number"
      });
    }
  }
  if (seed != null) {
    if (!Number.isInteger(seed)) {
      throw new InvalidArgumentError2({
        parameter: "seed",
        value: seed,
        message: "seed must be an integer"
      });
    }
  }
  return {
    maxOutputTokens,
    temperature,
    topP,
    topK,
    presencePenalty,
    frequencyPenalty,
    stopSequences,
    seed
  };
}
function isNonEmptyObject(object2) {
  return object2 != null && Object.keys(object2).length > 0;
}
async function prepareToolsAndToolChoice({
  tools,
  toolChoice,
  activeTools
}) {
  if (!isNonEmptyObject(tools)) {
    return {
      tools: void 0,
      toolChoice: void 0
    };
  }
  const filteredTools = activeTools != null ? Object.entries(tools).filter(
    ([name21]) => activeTools.includes(name21)
  ) : Object.entries(tools);
  const languageModelTools = [];
  for (const [name21, tool2] of filteredTools) {
    const toolType = tool2.type;
    switch (toolType) {
      case void 0:
      case "dynamic":
      case "function":
        languageModelTools.push({
          type: "function",
          name: name21,
          description: tool2.description,
          inputSchema: await asSchema(tool2.inputSchema).jsonSchema,
          ...tool2.inputExamples != null ? { inputExamples: tool2.inputExamples } : {},
          providerOptions: tool2.providerOptions,
          ...tool2.strict != null ? { strict: tool2.strict } : {}
        });
        break;
      case "provider":
        languageModelTools.push({
          type: "provider",
          name: name21,
          id: tool2.id,
          args: tool2.args
        });
        break;
      default: {
        const exhaustiveCheck = toolType;
        throw new Error(`Unsupported tool type: ${exhaustiveCheck}`);
      }
    }
  }
  return {
    tools: languageModelTools,
    toolChoice: toolChoice == null ? { type: "auto" } : typeof toolChoice === "string" ? { type: toolChoice } : { type: "tool", toolName: toolChoice.toolName }
  };
}
var jsonValueSchema = lazy(
  () => union([
    _null(),
    string(),
    number(),
    boolean(),
    record(string(), jsonValueSchema.optional()),
    array$1(jsonValueSchema)
  ])
);
var providerMetadataSchema = record(
  string(),
  record(string(), jsonValueSchema.optional())
);
var textPartSchema = object$1({
  type: literal("text"),
  text: string(),
  providerOptions: providerMetadataSchema.optional()
});
var imagePartSchema = object$1({
  type: literal("image"),
  image: union([dataContentSchema, _instanceof(URL)]),
  mediaType: string().optional(),
  providerOptions: providerMetadataSchema.optional()
});
var filePartSchema = object$1({
  type: literal("file"),
  data: union([dataContentSchema, _instanceof(URL)]),
  filename: string().optional(),
  mediaType: string(),
  providerOptions: providerMetadataSchema.optional()
});
var reasoningPartSchema = object$1({
  type: literal("reasoning"),
  text: string(),
  providerOptions: providerMetadataSchema.optional()
});
var toolCallPartSchema = object$1({
  type: literal("tool-call"),
  toolCallId: string(),
  toolName: string(),
  input: unknown(),
  providerOptions: providerMetadataSchema.optional(),
  providerExecuted: boolean().optional()
});
var outputSchema = discriminatedUnion(
  "type",
  [
    object$1({
      type: literal("text"),
      value: string(),
      providerOptions: providerMetadataSchema.optional()
    }),
    object$1({
      type: literal("json"),
      value: jsonValueSchema,
      providerOptions: providerMetadataSchema.optional()
    }),
    object$1({
      type: literal("execution-denied"),
      reason: string().optional(),
      providerOptions: providerMetadataSchema.optional()
    }),
    object$1({
      type: literal("error-text"),
      value: string(),
      providerOptions: providerMetadataSchema.optional()
    }),
    object$1({
      type: literal("error-json"),
      value: jsonValueSchema,
      providerOptions: providerMetadataSchema.optional()
    }),
    object$1({
      type: literal("content"),
      value: array$1(
        union([
          object$1({
            type: literal("text"),
            text: string(),
            providerOptions: providerMetadataSchema.optional()
          }),
          object$1({
            type: literal("media"),
            data: string(),
            mediaType: string()
          }),
          object$1({
            type: literal("file-data"),
            data: string(),
            mediaType: string(),
            filename: string().optional(),
            providerOptions: providerMetadataSchema.optional()
          }),
          object$1({
            type: literal("file-url"),
            url: string(),
            providerOptions: providerMetadataSchema.optional()
          }),
          object$1({
            type: literal("file-id"),
            fileId: union([string(), record(string(), string())]),
            providerOptions: providerMetadataSchema.optional()
          }),
          object$1({
            type: literal("image-data"),
            data: string(),
            mediaType: string(),
            providerOptions: providerMetadataSchema.optional()
          }),
          object$1({
            type: literal("image-url"),
            url: string(),
            providerOptions: providerMetadataSchema.optional()
          }),
          object$1({
            type: literal("image-file-id"),
            fileId: union([string(), record(string(), string())]),
            providerOptions: providerMetadataSchema.optional()
          }),
          object$1({
            type: literal("custom"),
            providerOptions: providerMetadataSchema.optional()
          })
        ])
      )
    })
  ]
);
var toolResultPartSchema = object$1({
  type: literal("tool-result"),
  toolCallId: string(),
  toolName: string(),
  output: outputSchema,
  providerOptions: providerMetadataSchema.optional()
});
var toolApprovalRequestSchema = object$1({
  type: literal("tool-approval-request"),
  approvalId: string(),
  toolCallId: string()
});
var toolApprovalResponseSchema = object$1({
  type: literal("tool-approval-response"),
  approvalId: string(),
  approved: boolean(),
  reason: string().optional()
});
var systemModelMessageSchema = object$1(
  {
    role: literal("system"),
    content: string(),
    providerOptions: providerMetadataSchema.optional()
  }
);
var userModelMessageSchema = object$1({
  role: literal("user"),
  content: union([
    string(),
    array$1(union([textPartSchema, imagePartSchema, filePartSchema]))
  ]),
  providerOptions: providerMetadataSchema.optional()
});
var assistantModelMessageSchema = object$1({
  role: literal("assistant"),
  content: union([
    string(),
    array$1(
      union([
        textPartSchema,
        filePartSchema,
        reasoningPartSchema,
        toolCallPartSchema,
        toolResultPartSchema,
        toolApprovalRequestSchema
      ])
    )
  ]),
  providerOptions: providerMetadataSchema.optional()
});
var toolModelMessageSchema = object$1({
  role: literal("tool"),
  content: array$1(union([toolResultPartSchema, toolApprovalResponseSchema])),
  providerOptions: providerMetadataSchema.optional()
});
var modelMessageSchema = union([
  systemModelMessageSchema,
  userModelMessageSchema,
  assistantModelMessageSchema,
  toolModelMessageSchema
]);
async function standardizePrompt({
  allowSystemInMessages,
  system,
  prompt,
  messages
}) {
  if (prompt == null && messages == null) {
    throw new InvalidPromptError({
      prompt,
      message: "prompt or messages must be defined"
    });
  }
  if (prompt != null && messages != null) {
    throw new InvalidPromptError({
      prompt,
      message: "prompt and messages cannot be defined at the same time"
    });
  }
  if (typeof system !== "string" && !asArray(system).every((message) => message.role === "system")) {
    throw new InvalidPromptError({
      prompt,
      message: "system must be a string, SystemModelMessage, or array of SystemModelMessage"
    });
  }
  if (prompt != null && typeof prompt === "string") {
    messages = [{ role: "user", content: prompt }];
  } else if (prompt != null && Array.isArray(prompt)) {
    messages = prompt;
  } else if (messages == null) {
    throw new InvalidPromptError({
      prompt,
      message: "prompt or messages must be defined"
    });
  }
  if (messages.length === 0) {
    throw new InvalidPromptError({
      prompt,
      message: "messages must not be empty"
    });
  }
  if (messages.some((message) => message.role === "system")) {
    if (allowSystemInMessages === false) {
      throw new InvalidPromptError({
        prompt,
        message: "System messages are not allowed in the prompt or messages fields. Use the system option instead."
      });
    }
    if (allowSystemInMessages === void 0) {
      console.warn(
        "AI SDK Warning: System messages in the prompt or messages fields can be a security risk because they may enable prompt injection attacks. Use the system option instead when possible. Set allowSystemInMessages to true to suppress this warning, or false to throw an error."
      );
    }
  }
  const validationResult = await safeValidateTypes({
    value: messages,
    schema: array$1(modelMessageSchema)
  });
  if (!validationResult.success) {
    throw new InvalidPromptError({
      prompt,
      message: "The messages do not match the ModelMessage[] schema.",
      cause: validationResult.error
    });
  }
  return { messages, system };
}
function wrapGatewayError(error) {
  if (!GatewayAuthenticationError.isInstance(error))
    return error;
  const isProductionEnv = (process == null ? void 0 : "production") === "production";
  const moreInfoURL = "https://ai-sdk.dev/unauthenticated-ai-gateway";
  if (isProductionEnv) {
    return new AISDKError({
      name: "GatewayError",
      message: `Unauthenticated. Configure AI_GATEWAY_API_KEY or use a provider module. Learn more: ${moreInfoURL}`
    });
  }
  return Object.assign(
    new Error(`\x1B[1m\x1B[31mUnauthenticated request to AI Gateway.\x1B[0m

To authenticate, set the \x1B[33mAI_GATEWAY_API_KEY\x1B[0m environment variable with your API key.

Alternatively, you can use a provider module instead of the AI Gateway.

Learn more: \x1B[34m${moreInfoURL}\x1B[0m

`),
    { name: "GatewayAuthenticationError" }
  );
}
function assembleOperationName({
  operationId,
  telemetry
}) {
  return {
    // standardized operation and resource name:
    "operation.name": `${operationId}${(telemetry == null ? void 0 : telemetry.functionId) != null ? ` ${telemetry.functionId}` : ""}`,
    "resource.name": telemetry == null ? void 0 : telemetry.functionId,
    // detailed, AI SDK specific data:
    "ai.operationId": operationId,
    "ai.telemetry.functionId": telemetry == null ? void 0 : telemetry.functionId
  };
}
function getBaseTelemetryAttributes({
  model,
  settings,
  telemetry,
  headers
}) {
  var _a21;
  return {
    "ai.model.provider": model.provider,
    "ai.model.id": model.modelId,
    // settings:
    ...Object.entries(settings).reduce((attributes, [key, value]) => {
      if (key === "timeout") {
        const totalTimeoutMs = getTotalTimeoutMs(
          value
        );
        if (totalTimeoutMs != null) {
          attributes[`ai.settings.${key}`] = totalTimeoutMs;
        }
      } else {
        attributes[`ai.settings.${key}`] = value;
      }
      return attributes;
    }, {}),
    // add metadata as attributes:
    ...Object.entries((_a21 = telemetry == null ? void 0 : telemetry.metadata) != null ? _a21 : {}).reduce(
      (attributes, [key, value]) => {
        attributes[`ai.telemetry.metadata.${key}`] = value;
        return attributes;
      },
      {}
    ),
    // request headers
    ...Object.entries(headers != null ? headers : {}).reduce((attributes, [key, value]) => {
      if (value !== void 0) {
        attributes[`ai.request.headers.${key}`] = value;
      }
      return attributes;
    }, {})
  };
}
var noopTracer = {
  startSpan() {
    return noopSpan;
  },
  startActiveSpan(name21, arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
      return arg1(noopSpan);
    }
    if (typeof arg2 === "function") {
      return arg2(noopSpan);
    }
    if (typeof arg3 === "function") {
      return arg3(noopSpan);
    }
  }
};
var noopSpan = {
  spanContext() {
    return noopSpanContext;
  },
  setAttribute() {
    return this;
  },
  setAttributes() {
    return this;
  },
  addEvent() {
    return this;
  },
  addLink() {
    return this;
  },
  addLinks() {
    return this;
  },
  setStatus() {
    return this;
  },
  updateName() {
    return this;
  },
  end() {
    return this;
  },
  isRecording() {
    return false;
  },
  recordException() {
    return this;
  }
};
var noopSpanContext = {
  traceId: "",
  spanId: "",
  traceFlags: 0
};
function getTracer({
  isEnabled = false,
  tracer
} = {}) {
  if (!isEnabled) {
    return noopTracer;
  }
  if (tracer) {
    return tracer;
  }
  return trace.getTracer("ai");
}
async function recordSpan({
  name: name21,
  tracer,
  attributes,
  fn,
  endWhenDone = true
}) {
  return tracer.startActiveSpan(
    name21,
    { attributes: await attributes },
    async (span) => {
      const ctx = context.active();
      try {
        const result = await context.with(ctx, () => fn(span));
        if (endWhenDone) {
          span.end();
        }
        return result;
      } catch (error) {
        try {
          recordErrorOnSpan(span, error);
        } finally {
          span.end();
        }
        throw error;
      }
    }
  );
}
function recordErrorOnSpan(span, error) {
  if (error instanceof Error) {
    span.recordException({
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
  } else {
    span.setStatus({ code: SpanStatusCode.ERROR });
  }
}
async function selectTelemetryAttributes({
  telemetry,
  attributes
}) {
  if ((telemetry == null ? void 0 : telemetry.isEnabled) !== true) {
    return {};
  }
  const resultAttributes = {};
  for (const [key, value] of Object.entries(attributes)) {
    if (value == null) {
      continue;
    }
    if (typeof value === "object" && "input" in value && typeof value.input === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordInputs) === false) {
        continue;
      }
      const result = await value.input();
      if (result != null) {
        resultAttributes[key] = result;
      }
      continue;
    }
    if (typeof value === "object" && "output" in value && typeof value.output === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordOutputs) === false) {
        continue;
      }
      const result = await value.output();
      if (result != null) {
        resultAttributes[key] = result;
      }
      continue;
    }
    resultAttributes[key] = value;
  }
  return resultAttributes;
}
function stringifyForTelemetry(prompt) {
  return JSON.stringify(
    prompt.map((message) => ({
      ...message,
      content: typeof message.content === "string" ? message.content : message.content.map(
        (part) => part.type === "file" ? {
          ...part,
          data: part.data instanceof Uint8Array ? convertDataContentToBase64String(part.data) : part.data
        } : part
      )
    }))
  );
}
function getGlobalTelemetryIntegrations() {
  var _a21;
  return (_a21 = globalThis.AI_SDK_TELEMETRY_INTEGRATIONS) != null ? _a21 : [];
}
function getGlobalTelemetryIntegration() {
  const globalIntegrations = getGlobalTelemetryIntegrations();
  return (integrations) => {
    const localIntegrations = asArray(integrations);
    const allIntegrations = [...globalIntegrations, ...localIntegrations];
    function createTelemetryComposite(getListenerFromIntegration) {
      const listeners = allIntegrations.map(getListenerFromIntegration).filter(Boolean);
      return async (event) => {
        for (const listener of listeners) {
          try {
            await listener(event);
          } catch (_ignored) {
          }
        }
      };
    }
    return {
      onStart: createTelemetryComposite((integration) => integration.onStart),
      onStepStart: createTelemetryComposite(
        (integration) => integration.onStepStart
      ),
      onToolCallStart: createTelemetryComposite(
        (integration) => integration.onToolCallStart
      ),
      onToolCallFinish: createTelemetryComposite(
        (integration) => integration.onToolCallFinish
      ),
      onStepFinish: createTelemetryComposite(
        (integration) => integration.onStepFinish
      ),
      onFinish: createTelemetryComposite((integration) => integration.onFinish)
    };
  };
}
function asLanguageModelUsage(usage) {
  return {
    inputTokens: usage.inputTokens.total,
    inputTokenDetails: {
      noCacheTokens: usage.inputTokens.noCache,
      cacheReadTokens: usage.inputTokens.cacheRead,
      cacheWriteTokens: usage.inputTokens.cacheWrite
    },
    outputTokens: usage.outputTokens.total,
    outputTokenDetails: {
      textTokens: usage.outputTokens.text,
      reasoningTokens: usage.outputTokens.reasoning
    },
    totalTokens: addTokenCounts(
      usage.inputTokens.total,
      usage.outputTokens.total
    ),
    raw: usage.raw,
    reasoningTokens: usage.outputTokens.reasoning,
    cachedInputTokens: usage.inputTokens.cacheRead
  };
}
function createNullLanguageModelUsage() {
  return {
    inputTokens: void 0,
    inputTokenDetails: {
      noCacheTokens: void 0,
      cacheReadTokens: void 0,
      cacheWriteTokens: void 0
    },
    outputTokens: void 0,
    outputTokenDetails: {
      textTokens: void 0,
      reasoningTokens: void 0
    },
    totalTokens: void 0,
    raw: void 0
  };
}
function addLanguageModelUsage(usage1, usage2) {
  var _a21, _b9, _c, _d, _e, _f, _g, _h, _i, _j;
  return {
    inputTokens: addTokenCounts(usage1.inputTokens, usage2.inputTokens),
    inputTokenDetails: {
      noCacheTokens: addTokenCounts(
        (_a21 = usage1.inputTokenDetails) == null ? void 0 : _a21.noCacheTokens,
        (_b9 = usage2.inputTokenDetails) == null ? void 0 : _b9.noCacheTokens
      ),
      cacheReadTokens: addTokenCounts(
        (_c = usage1.inputTokenDetails) == null ? void 0 : _c.cacheReadTokens,
        (_d = usage2.inputTokenDetails) == null ? void 0 : _d.cacheReadTokens
      ),
      cacheWriteTokens: addTokenCounts(
        (_e = usage1.inputTokenDetails) == null ? void 0 : _e.cacheWriteTokens,
        (_f = usage2.inputTokenDetails) == null ? void 0 : _f.cacheWriteTokens
      )
    },
    outputTokens: addTokenCounts(usage1.outputTokens, usage2.outputTokens),
    outputTokenDetails: {
      textTokens: addTokenCounts(
        (_g = usage1.outputTokenDetails) == null ? void 0 : _g.textTokens,
        (_h = usage2.outputTokenDetails) == null ? void 0 : _h.textTokens
      ),
      reasoningTokens: addTokenCounts(
        (_i = usage1.outputTokenDetails) == null ? void 0 : _i.reasoningTokens,
        (_j = usage2.outputTokenDetails) == null ? void 0 : _j.reasoningTokens
      )
    },
    totalTokens: addTokenCounts(usage1.totalTokens, usage2.totalTokens),
    reasoningTokens: addTokenCounts(
      usage1.reasoningTokens,
      usage2.reasoningTokens
    ),
    cachedInputTokens: addTokenCounts(
      usage1.cachedInputTokens,
      usage2.cachedInputTokens
    )
  };
}
function addTokenCounts(tokenCount1, tokenCount2) {
  return tokenCount1 == null && tokenCount2 == null ? void 0 : (tokenCount1 != null ? tokenCount1 : 0) + (tokenCount2 != null ? tokenCount2 : 0);
}
function mergeObjects(base, overrides) {
  if (base === void 0 && overrides === void 0) {
    return void 0;
  }
  if (base === void 0) {
    return overrides;
  }
  if (overrides === void 0) {
    return base;
  }
  const result = { ...base };
  for (const key in overrides) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(overrides, key)) {
      const overridesValue = overrides[key];
      if (overridesValue === void 0)
        continue;
      const baseValue = key in base ? base[key] : void 0;
      const isSourceObject = overridesValue !== null && typeof overridesValue === "object" && !Array.isArray(overridesValue) && !(overridesValue instanceof Date) && !(overridesValue instanceof RegExp);
      const isTargetObject = baseValue !== null && baseValue !== void 0 && typeof baseValue === "object" && !Array.isArray(baseValue) && !(baseValue instanceof Date) && !(baseValue instanceof RegExp);
      if (isSourceObject && isTargetObject) {
        result[key] = mergeObjects(
          baseValue,
          overridesValue
        );
      } else {
        result[key] = overridesValue;
      }
    }
  }
  return result;
}
function getRetryDelayInMs({
  error,
  exponentialBackoffDelay
}) {
  const headers = APICallError.isInstance(error) ? error.responseHeaders : APICallError.isInstance(error.cause) ? error.cause.responseHeaders : void 0;
  if (!headers)
    return exponentialBackoffDelay;
  let ms;
  const retryAfterMs = headers["retry-after-ms"];
  if (retryAfterMs) {
    const timeoutMs = parseFloat(retryAfterMs);
    if (!Number.isNaN(timeoutMs)) {
      ms = timeoutMs;
    }
  }
  const retryAfter = headers["retry-after"];
  if (retryAfter && ms === void 0) {
    const timeoutSeconds = parseFloat(retryAfter);
    if (!Number.isNaN(timeoutSeconds)) {
      ms = timeoutSeconds * 1e3;
    } else {
      ms = Date.parse(retryAfter) - Date.now();
    }
  }
  if (ms != null && !Number.isNaN(ms) && 0 <= ms && (ms < 60 * 1e3 || ms < exponentialBackoffDelay)) {
    return ms;
  }
  return exponentialBackoffDelay;
}
var retryWithExponentialBackoffRespectingRetryHeaders = ({
  maxRetries = 2,
  initialDelayInMs = 2e3,
  backoffFactor = 2,
  abortSignal
} = {}) => async (f) => _retryWithExponentialBackoff(f, {
  maxRetries,
  delayInMs: initialDelayInMs,
  backoffFactor,
  abortSignal
});
async function _retryWithExponentialBackoff(f, {
  maxRetries,
  delayInMs,
  backoffFactor,
  abortSignal
}, errors = []) {
  try {
    return await f();
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }
    if (maxRetries === 0) {
      throw error;
    }
    const errorMessage = getErrorMessage(error);
    const newErrors = [...errors, error];
    const tryNumber = newErrors.length;
    if (tryNumber > maxRetries) {
      throw new RetryError({
        message: `Failed after ${tryNumber} attempts. Last error: ${errorMessage}`,
        reason: "maxRetriesExceeded",
        errors: newErrors
      });
    }
    if (error instanceof Error && (APICallError.isInstance(error) && error.isRetryable === true || GatewayError.isInstance(error) && error.isRetryable === true) && tryNumber <= maxRetries) {
      await delay(
        getRetryDelayInMs({
          error,
          exponentialBackoffDelay: delayInMs
        }),
        { abortSignal }
      );
      return _retryWithExponentialBackoff(
        f,
        {
          maxRetries,
          delayInMs: backoffFactor * delayInMs,
          backoffFactor,
          abortSignal
        },
        newErrors
      );
    }
    if (tryNumber === 1) {
      throw error;
    }
    throw new RetryError({
      message: `Failed after ${tryNumber} attempts with non-retryable error: '${errorMessage}'`,
      reason: "errorNotRetryable",
      errors: newErrors
    });
  }
}
function prepareRetries({
  maxRetries,
  abortSignal
}) {
  if (maxRetries != null) {
    if (!Number.isInteger(maxRetries)) {
      throw new InvalidArgumentError2({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be an integer"
      });
    }
    if (maxRetries < 0) {
      throw new InvalidArgumentError2({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be >= 0"
      });
    }
  }
  const maxRetriesResult = maxRetries != null ? maxRetries : 2;
  return {
    maxRetries: maxRetriesResult,
    retry: retryWithExponentialBackoffRespectingRetryHeaders({
      maxRetries: maxRetriesResult,
      abortSignal
    })
  };
}
function collectToolApprovals({
  messages
}) {
  const lastMessage = messages.at(-1);
  if ((lastMessage == null ? void 0 : lastMessage.role) != "tool") {
    return {
      approvedToolApprovals: [],
      deniedToolApprovals: []
    };
  }
  const toolCallsByToolCallId = {};
  for (const message of messages) {
    if (message.role === "assistant" && typeof message.content !== "string") {
      const content = message.content;
      for (const part of content) {
        if (part.type === "tool-call") {
          toolCallsByToolCallId[part.toolCallId] = part;
        }
      }
    }
  }
  const toolApprovalRequestsByApprovalId = {};
  for (const message of messages) {
    if (message.role === "assistant" && typeof message.content !== "string") {
      const content = message.content;
      for (const part of content) {
        if (part.type === "tool-approval-request") {
          toolApprovalRequestsByApprovalId[part.approvalId] = part;
        }
      }
    }
  }
  const toolResults = {};
  for (const part of lastMessage.content) {
    if (part.type === "tool-result") {
      toolResults[part.toolCallId] = part;
    }
  }
  const approvedToolApprovals = [];
  const deniedToolApprovals = [];
  const approvalResponses = lastMessage.content.filter(
    (part) => part.type === "tool-approval-response"
  );
  for (const approvalResponse of approvalResponses) {
    const approvalRequest = toolApprovalRequestsByApprovalId[approvalResponse.approvalId];
    if (approvalRequest == null) {
      throw new InvalidToolApprovalError({
        approvalId: approvalResponse.approvalId
      });
    }
    if (toolResults[approvalRequest.toolCallId] != null) {
      continue;
    }
    const toolCall = toolCallsByToolCallId[approvalRequest.toolCallId];
    if (toolCall == null) {
      throw new ToolCallNotFoundForApprovalError({
        toolCallId: approvalRequest.toolCallId,
        approvalId: approvalRequest.approvalId
      });
    }
    const approval = {
      approvalRequest,
      approvalResponse,
      toolCall
    };
    if (approvalResponse.approved) {
      approvedToolApprovals.push(approval);
    } else {
      deniedToolApprovals.push(approval);
    }
  }
  return { approvedToolApprovals, deniedToolApprovals };
}
function now() {
  var _a21, _b9;
  return (_b9 = (_a21 = globalThis == null ? void 0 : globalThis.performance) == null ? void 0 : _a21.now()) != null ? _b9 : Date.now();
}
async function executeToolCall({
  toolCall,
  tools,
  tracer,
  telemetry,
  messages,
  abortSignal,
  experimental_context,
  stepNumber,
  model,
  onPreliminaryToolResult,
  onToolCallStart,
  onToolCallFinish
}) {
  const { toolName, toolCallId, input } = toolCall;
  const tool2 = tools == null ? void 0 : tools[toolName];
  if ((tool2 == null ? void 0 : tool2.execute) == null) {
    return void 0;
  }
  const baseCallbackEvent = {
    stepNumber,
    model,
    toolCall,
    messages,
    abortSignal,
    functionId: telemetry == null ? void 0 : telemetry.functionId,
    metadata: telemetry == null ? void 0 : telemetry.metadata,
    experimental_context
  };
  return recordSpan({
    name: "ai.toolCall",
    attributes: selectTelemetryAttributes({
      telemetry,
      attributes: {
        ...assembleOperationName({
          operationId: "ai.toolCall",
          telemetry
        }),
        "ai.toolCall.name": toolName,
        "ai.toolCall.id": toolCallId,
        "ai.toolCall.args": {
          output: () => JSON.stringify(input)
        }
      }
    }),
    tracer,
    fn: async (span) => {
      let output;
      await notify({ event: baseCallbackEvent, callbacks: onToolCallStart });
      const startTime = now();
      try {
        const stream = executeTool({
          execute: tool2.execute.bind(tool2),
          input,
          options: {
            toolCallId,
            messages,
            abortSignal,
            experimental_context
          }
        });
        for await (const part of stream) {
          if (part.type === "preliminary") {
            onPreliminaryToolResult == null ? void 0 : onPreliminaryToolResult({
              ...toolCall,
              type: "tool-result",
              output: part.output,
              preliminary: true
            });
          } else {
            output = part.output;
          }
        }
      } catch (error) {
        const durationMs2 = now() - startTime;
        await notify({
          event: {
            ...baseCallbackEvent,
            success: false,
            error,
            durationMs: durationMs2
          },
          callbacks: onToolCallFinish
        });
        recordErrorOnSpan(span, error);
        return {
          type: "tool-error",
          toolCallId,
          toolName,
          input,
          error,
          dynamic: tool2.type === "dynamic",
          ...toolCall.providerMetadata != null ? { providerMetadata: toolCall.providerMetadata } : {},
          ...toolCall.toolMetadata != null ? { toolMetadata: toolCall.toolMetadata } : {}
        };
      }
      const durationMs = now() - startTime;
      await notify({
        event: {
          ...baseCallbackEvent,
          success: true,
          output,
          durationMs
        },
        callbacks: onToolCallFinish
      });
      try {
        span.setAttributes(
          await selectTelemetryAttributes({
            telemetry,
            attributes: {
              "ai.toolCall.result": {
                output: () => JSON.stringify(output)
              }
            }
          })
        );
      } catch (ignored) {
      }
      return {
        type: "tool-result",
        toolCallId,
        toolName,
        input,
        output,
        dynamic: tool2.type === "dynamic",
        ...toolCall.providerMetadata != null ? { providerMetadata: toolCall.providerMetadata } : {},
        ...toolCall.toolMetadata != null ? { toolMetadata: toolCall.toolMetadata } : {}
      };
    }
  });
}
function extractReasoningContent(content) {
  const parts = content.filter(
    (content2) => content2.type === "reasoning"
  );
  return parts.length === 0 ? void 0 : parts.map((content2) => content2.text).join("\n");
}
function extractTextContent(content) {
  const parts = content.filter(
    (content2) => content2.type === "text"
  );
  if (parts.length === 0) {
    return void 0;
  }
  return parts.map((content2) => content2.text).join("");
}
var DefaultGeneratedFile = class {
  constructor({
    data,
    mediaType
  }) {
    const isUint8Array = data instanceof Uint8Array;
    this.base64Data = isUint8Array ? void 0 : data;
    this.uint8ArrayData = isUint8Array ? data : void 0;
    this.mediaType = mediaType;
  }
  // lazy conversion with caching to avoid unnecessary conversion overhead:
  get base64() {
    if (this.base64Data == null) {
      this.base64Data = convertUint8ArrayToBase64(this.uint8ArrayData);
    }
    return this.base64Data;
  }
  // lazy conversion with caching to avoid unnecessary conversion overhead:
  get uint8Array() {
    if (this.uint8ArrayData == null) {
      this.uint8ArrayData = convertBase64ToUint8Array(this.base64Data);
    }
    return this.uint8ArrayData;
  }
};
var DefaultGeneratedFileWithType = class extends DefaultGeneratedFile {
  constructor(options) {
    super(options);
    this.type = "file";
  }
};
async function isApprovalNeeded({
  tool: tool2,
  toolCall,
  messages,
  experimental_context
}) {
  if (tool2.needsApproval == null) {
    return false;
  }
  if (typeof tool2.needsApproval === "boolean") {
    return tool2.needsApproval;
  }
  return await tool2.needsApproval(toolCall.input, {
    toolCallId: toolCall.toolCallId,
    messages,
    experimental_context
  });
}
var output_exports = {};
__export(output_exports, {
  array: () => array,
  choice: () => choice,
  json: () => json,
  object: () => object,
  text: () => text
});
function fixJson(input) {
  const stack = ["ROOT"];
  let lastValidIndex = -1;
  let literalStart = null;
  function processValueStart(char, i, swapState) {
    {
      switch (char) {
        case '"': {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_STRING");
          break;
        }
        case "f":
        case "t":
        case "n": {
          lastValidIndex = i;
          literalStart = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_LITERAL");
          break;
        }
        case "-": {
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "{": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_OBJECT_START");
          break;
        }
        case "[": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_ARRAY_START");
          break;
        }
      }
    }
  }
  function processAfterObjectValue(char, i) {
    switch (char) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        lastValidIndex = i;
        stack.pop();
        break;
      }
    }
  }
  function processAfterArrayValue(char, i) {
    switch (char) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_ARRAY_AFTER_COMMA");
        break;
      }
      case "]": {
        lastValidIndex = i;
        stack.pop();
        break;
      }
    }
  }
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const currentState = stack[stack.length - 1];
    switch (currentState) {
      case "ROOT":
        processValueStart(char, i, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
          case "}": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (char) {
          case ":": {
            stack.pop();
            stack.push("INSIDE_OBJECT_BEFORE_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        processValueStart(char, i, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        processAfterObjectValue(char, i);
        break;
      }
      case "INSIDE_STRING": {
        switch (char) {
          case '"': {
            stack.pop();
            lastValidIndex = i;
            break;
          }
          case "\\": {
            stack.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default: {
            lastValidIndex = i;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (char) {
          case "]": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i;
            processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (char) {
          case ",": {
            stack.pop();
            stack.push("INSIDE_ARRAY_AFTER_COMMA");
            break;
          }
          case "]": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        stack.pop();
        lastValidIndex = i;
        break;
      }
      case "INSIDE_NUMBER": {
        switch (char) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            lastValidIndex = i;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".": {
            break;
          }
          case ",": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            }
            break;
          }
          case "}": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            }
            break;
          }
          case "]": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
            break;
          }
          default: {
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, i + 1);
        if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
          stack.pop();
          if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
            processAfterObjectValue(char, i);
          } else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
            processAfterArrayValue(char, i);
          }
        } else {
          lastValidIndex = i;
        }
        break;
      }
    }
  }
  let result = input.slice(0, lastValidIndex + 1);
  for (let i = stack.length - 1; i >= 0; i--) {
    const state = stack[i];
    switch (state) {
      case "INSIDE_STRING": {
        result += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        result += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        result += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, input.length);
        if ("true".startsWith(partialLiteral)) {
          result += "true".slice(partialLiteral.length);
        } else if ("false".startsWith(partialLiteral)) {
          result += "false".slice(partialLiteral.length);
        } else if ("null".startsWith(partialLiteral)) {
          result += "null".slice(partialLiteral.length);
        }
      }
    }
  }
  return result;
}
async function parsePartialJson(jsonText) {
  if (jsonText === void 0) {
    return { value: void 0, state: "undefined-input" };
  }
  let result = await safeParseJSON({ text: jsonText });
  if (result.success) {
    return { value: result.value, state: "successful-parse" };
  }
  result = await safeParseJSON({ text: fixJson(jsonText) });
  if (result.success) {
    return { value: result.value, state: "repaired-parse" };
  }
  return { value: void 0, state: "failed-parse" };
}
var text = () => ({
  name: "text",
  responseFormat: Promise.resolve({ type: "text" }),
  async parseCompleteOutput({ text: text2 }) {
    return text2;
  },
  async parsePartialOutput({ text: text2 }) {
    return { partial: text2 };
  },
  createElementStreamTransform() {
    return void 0;
  }
});
var object = ({
  schema: inputSchema,
  name: name21,
  description
}) => {
  const schema = asSchema(inputSchema);
  return {
    name: "object",
    responseFormat: resolve(schema.jsonSchema).then((jsonSchema2) => ({
      type: "json",
      schema: jsonSchema2,
      ...name21 != null && { name: name21 },
      ...description != null && { description }
    })),
    async parseCompleteOutput({ text: text2 }, context2) {
      const parseResult = await safeParseJSON({ text: text2 });
      if (!parseResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: could not parse the response.",
          cause: parseResult.error,
          text: text2,
          response: context2.response,
          usage: context2.usage,
          finishReason: context2.finishReason
        });
      }
      const validationResult = await safeValidateTypes({
        value: parseResult.value,
        schema
      });
      if (!validationResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: response did not match schema.",
          cause: validationResult.error,
          text: text2,
          response: context2.response,
          usage: context2.usage,
          finishReason: context2.finishReason
        });
      }
      return validationResult.value;
    },
    async parsePartialOutput({ text: text2 }) {
      const result = await parsePartialJson(text2);
      switch (result.state) {
        case "failed-parse":
        case "undefined-input": {
          return void 0;
        }
        case "repaired-parse":
        case "successful-parse": {
          return {
            // Note: currently no validation of partial results:
            partial: result.value
          };
        }
      }
    },
    createElementStreamTransform() {
      return void 0;
    }
  };
};
var array = ({
  element: inputElementSchema,
  name: name21,
  description
}) => {
  const elementSchema = asSchema(inputElementSchema);
  return {
    name: "array",
    // JSON schema that describes an array of elements:
    responseFormat: resolve(elementSchema.jsonSchema).then((jsonSchema2) => {
      const { $schema, ...itemSchema } = jsonSchema2;
      return {
        type: "json",
        schema: {
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          properties: {
            elements: { type: "array", items: itemSchema }
          },
          required: ["elements"],
          additionalProperties: false
        },
        ...name21 != null && { name: name21 },
        ...description != null && { description }
      };
    }),
    async parseCompleteOutput({ text: text2 }, context2) {
      const parseResult = await safeParseJSON({ text: text2 });
      if (!parseResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: could not parse the response.",
          cause: parseResult.error,
          text: text2,
          response: context2.response,
          usage: context2.usage,
          finishReason: context2.finishReason
        });
      }
      const outerValue = parseResult.value;
      if (outerValue == null || typeof outerValue !== "object" || !("elements" in outerValue) || !Array.isArray(outerValue.elements)) {
        throw new NoObjectGeneratedError({
          message: "No object generated: response did not match schema.",
          cause: new TypeValidationError({
            value: outerValue,
            cause: "response must be an object with an elements array"
          }),
          text: text2,
          response: context2.response,
          usage: context2.usage,
          finishReason: context2.finishReason
        });
      }
      for (const element of outerValue.elements) {
        const validationResult = await safeValidateTypes({
          value: element,
          schema: elementSchema
        });
        if (!validationResult.success) {
          throw new NoObjectGeneratedError({
            message: "No object generated: response did not match schema.",
            cause: validationResult.error,
            text: text2,
            response: context2.response,
            usage: context2.usage,
            finishReason: context2.finishReason
          });
        }
      }
      return outerValue.elements;
    },
    async parsePartialOutput({ text: text2 }) {
      const result = await parsePartialJson(text2);
      switch (result.state) {
        case "failed-parse":
        case "undefined-input": {
          return void 0;
        }
        case "repaired-parse":
        case "successful-parse": {
          const outerValue = result.value;
          if (outerValue == null || typeof outerValue !== "object" || !("elements" in outerValue) || !Array.isArray(outerValue.elements)) {
            return void 0;
          }
          const rawElements = result.state === "repaired-parse" && outerValue.elements.length > 0 ? outerValue.elements.slice(0, -1) : outerValue.elements;
          const parsedElements = [];
          for (const rawElement of rawElements) {
            const validationResult = await safeValidateTypes({
              value: rawElement,
              schema: elementSchema
            });
            if (validationResult.success) {
              parsedElements.push(validationResult.value);
            }
          }
          return { partial: parsedElements };
        }
      }
    },
    createElementStreamTransform() {
      let publishedElements = 0;
      return new TransformStream({
        transform({ partialOutput }, controller) {
          if (partialOutput != null) {
            for (; publishedElements < partialOutput.length; publishedElements++) {
              controller.enqueue(partialOutput[publishedElements]);
            }
          }
        }
      });
    }
  };
};
var choice = ({
  options: choiceOptions,
  name: name21,
  description
}) => {
  return {
    name: "choice",
    // JSON schema that describes an enumeration:
    responseFormat: Promise.resolve({
      type: "json",
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
          result: { type: "string", enum: choiceOptions }
        },
        required: ["result"],
        additionalProperties: false
      },
      ...name21 != null && { name: name21 },
      ...description != null && { description }
    }),
    async parseCompleteOutput({ text: text2 }, context2) {
      const parseResult = await safeParseJSON({ text: text2 });
      if (!parseResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: could not parse the response.",
          cause: parseResult.error,
          text: text2,
          response: context2.response,
          usage: context2.usage,
          finishReason: context2.finishReason
        });
      }
      const outerValue = parseResult.value;
      if (outerValue == null || typeof outerValue !== "object" || !("result" in outerValue) || typeof outerValue.result !== "string" || !choiceOptions.includes(outerValue.result)) {
        throw new NoObjectGeneratedError({
          message: "No object generated: response did not match schema.",
          cause: new TypeValidationError({
            value: outerValue,
            cause: "response must be an object that contains a choice value."
          }),
          text: text2,
          response: context2.response,
          usage: context2.usage,
          finishReason: context2.finishReason
        });
      }
      return outerValue.result;
    },
    async parsePartialOutput({ text: text2 }) {
      const result = await parsePartialJson(text2);
      switch (result.state) {
        case "failed-parse":
        case "undefined-input": {
          return void 0;
        }
        case "repaired-parse":
        case "successful-parse": {
          const outerValue = result.value;
          if (outerValue == null || typeof outerValue !== "object" || !("result" in outerValue) || typeof outerValue.result !== "string") {
            return void 0;
          }
          const potentialMatches = choiceOptions.filter(
            (choiceOption) => choiceOption.startsWith(outerValue.result)
          );
          if (result.state === "successful-parse") {
            return potentialMatches.includes(outerValue.result) ? { partial: outerValue.result } : void 0;
          } else {
            return potentialMatches.length === 1 ? { partial: potentialMatches[0] } : void 0;
          }
        }
      }
    },
    createElementStreamTransform() {
      return void 0;
    }
  };
};
var json = ({
  name: name21,
  description
} = {}) => {
  return {
    name: "json",
    responseFormat: Promise.resolve({
      type: "json",
      ...name21 != null && { name: name21 },
      ...description != null && { description }
    }),
    async parseCompleteOutput({ text: text2 }, context2) {
      const parseResult = await safeParseJSON({ text: text2 });
      if (!parseResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: could not parse the response.",
          cause: parseResult.error,
          text: text2,
          response: context2.response,
          usage: context2.usage,
          finishReason: context2.finishReason
        });
      }
      return parseResult.value;
    },
    async parsePartialOutput({ text: text2 }) {
      const result = await parsePartialJson(text2);
      switch (result.state) {
        case "failed-parse":
        case "undefined-input": {
          return void 0;
        }
        case "repaired-parse":
        case "successful-parse": {
          return result.value === void 0 ? void 0 : { partial: result.value };
        }
      }
    },
    createElementStreamTransform() {
      return void 0;
    }
  };
};
async function parseToolCall({
  toolCall,
  tools,
  repairToolCall,
  system,
  messages
}) {
  try {
    if (tools == null) {
      if (toolCall.providerExecuted && toolCall.dynamic) {
        return await parseProviderExecutedDynamicToolCall(toolCall);
      }
      throw new NoSuchToolError({ toolName: toolCall.toolName });
    }
    try {
      return await doParseToolCall({ toolCall, tools });
    } catch (error) {
      if (repairToolCall == null || !(NoSuchToolError.isInstance(error) || InvalidToolInputError.isInstance(error))) {
        throw error;
      }
      let repairedToolCall = null;
      try {
        repairedToolCall = await repairToolCall({
          toolCall,
          tools,
          inputSchema: async ({ toolName }) => {
            const { inputSchema } = tools[toolName];
            return await asSchema(inputSchema).jsonSchema;
          },
          system,
          messages,
          error
        });
      } catch (repairError) {
        throw new ToolCallRepairError({
          cause: repairError,
          originalError: error
        });
      }
      if (repairedToolCall == null) {
        throw error;
      }
      return await doParseToolCall({ toolCall: repairedToolCall, tools });
    }
  } catch (error) {
    const parsedInput = await safeParseJSON({ text: toolCall.input });
    const input = parsedInput.success ? parsedInput.value : toolCall.input;
    const tool2 = tools == null ? void 0 : tools[toolCall.toolName];
    return {
      type: "tool-call",
      toolCallId: toolCall.toolCallId,
      toolName: toolCall.toolName,
      input,
      dynamic: true,
      invalid: true,
      error,
      title: tool2 == null ? void 0 : tool2.title,
      providerExecuted: toolCall.providerExecuted,
      providerMetadata: toolCall.providerMetadata,
      ...(tool2 == null ? void 0 : tool2.metadata) != null ? { toolMetadata: tool2.metadata } : {}
    };
  }
}
async function parseProviderExecutedDynamicToolCall(toolCall) {
  const parseResult = toolCall.input.trim() === "" ? { success: true, value: {} } : await safeParseJSON({ text: toolCall.input });
  if (parseResult.success === false) {
    throw new InvalidToolInputError({
      toolName: toolCall.toolName,
      toolInput: toolCall.input,
      cause: parseResult.error
    });
  }
  return {
    type: "tool-call",
    toolCallId: toolCall.toolCallId,
    toolName: toolCall.toolName,
    input: parseResult.value,
    providerExecuted: true,
    dynamic: true,
    providerMetadata: toolCall.providerMetadata
  };
}
async function doParseToolCall({
  toolCall,
  tools
}) {
  const toolName = toolCall.toolName;
  const tool2 = tools[toolName];
  if (tool2 == null) {
    if (toolCall.providerExecuted && toolCall.dynamic) {
      return await parseProviderExecutedDynamicToolCall(toolCall);
    }
    throw new NoSuchToolError({
      toolName: toolCall.toolName,
      availableTools: Object.keys(tools)
    });
  }
  const schema = asSchema(tool2.inputSchema);
  const parseResult = toolCall.input.trim() === "" ? await safeValidateTypes({ value: {}, schema }) : await safeParseJSON({ text: toolCall.input, schema });
  if (parseResult.success === false) {
    throw new InvalidToolInputError({
      toolName,
      toolInput: toolCall.input,
      cause: parseResult.error
    });
  }
  return tool2.type === "dynamic" ? {
    type: "tool-call",
    toolCallId: toolCall.toolCallId,
    toolName: toolCall.toolName,
    input: parseResult.value,
    providerExecuted: toolCall.providerExecuted,
    providerMetadata: toolCall.providerMetadata,
    ...tool2.metadata != null ? { toolMetadata: tool2.metadata } : {},
    dynamic: true,
    title: tool2.title
  } : {
    type: "tool-call",
    toolCallId: toolCall.toolCallId,
    toolName,
    input: parseResult.value,
    providerExecuted: toolCall.providerExecuted,
    providerMetadata: toolCall.providerMetadata,
    ...tool2.metadata != null ? { toolMetadata: tool2.metadata } : {},
    title: tool2.title
  };
}
var DefaultStepResult = class {
  constructor({
    stepNumber,
    model,
    functionId,
    metadata,
    experimental_context,
    content,
    finishReason,
    rawFinishReason,
    usage,
    warnings,
    request,
    response,
    providerMetadata
  }) {
    this.stepNumber = stepNumber;
    this.model = model;
    this.functionId = functionId;
    this.metadata = metadata;
    this.experimental_context = experimental_context;
    this.content = content;
    this.finishReason = finishReason;
    this.rawFinishReason = rawFinishReason;
    this.usage = usage;
    this.warnings = warnings;
    this.request = request;
    this.response = response;
    this.providerMetadata = providerMetadata;
  }
  get text() {
    return this.content.filter((part) => part.type === "text").map((part) => part.text).join("");
  }
  get reasoning() {
    return this.content.filter((part) => part.type === "reasoning");
  }
  get reasoningText() {
    return this.reasoning.length === 0 ? void 0 : this.reasoning.map((part) => part.text).join("");
  }
  get files() {
    return this.content.filter((part) => part.type === "file").map((part) => part.file);
  }
  get sources() {
    return this.content.filter((part) => part.type === "source");
  }
  get toolCalls() {
    return this.content.filter((part) => part.type === "tool-call");
  }
  get staticToolCalls() {
    return this.toolCalls.filter(
      (toolCall) => toolCall.dynamic !== true
    );
  }
  get dynamicToolCalls() {
    return this.toolCalls.filter(
      (toolCall) => toolCall.dynamic === true
    );
  }
  get toolResults() {
    return this.content.filter((part) => part.type === "tool-result");
  }
  get staticToolResults() {
    return this.toolResults.filter(
      (toolResult) => toolResult.dynamic !== true
    );
  }
  get dynamicToolResults() {
    return this.toolResults.filter(
      (toolResult) => toolResult.dynamic === true
    );
  }
};
function stepCountIs(stepCount) {
  return ({ steps }) => steps.length === stepCount;
}
async function isStopConditionMet({
  stopConditions,
  steps
}) {
  return (await Promise.all(stopConditions.map((condition) => condition({ steps })))).some((result) => result);
}
async function toResponseMessages({
  content: inputContent,
  tools
}) {
  const responseMessages = [];
  const content = [];
  for (const part of inputContent) {
    if (part.type === "source") {
      continue;
    }
    if ((part.type === "tool-result" || part.type === "tool-error") && !part.providerExecuted) {
      continue;
    }
    if (part.type === "text" && part.text.length === 0) {
      continue;
    }
    switch (part.type) {
      case "text":
        content.push({
          type: "text",
          text: part.text,
          providerOptions: part.providerMetadata
        });
        break;
      case "reasoning":
        content.push({
          type: "reasoning",
          text: part.text,
          providerOptions: part.providerMetadata
        });
        break;
      case "file":
        content.push({
          type: "file",
          data: part.file.base64,
          mediaType: part.file.mediaType,
          providerOptions: part.providerMetadata
        });
        break;
      case "tool-call":
        content.push({
          type: "tool-call",
          toolCallId: part.toolCallId,
          toolName: part.toolName,
          input: part.invalid && typeof part.input !== "object" ? {} : part.input,
          providerExecuted: part.providerExecuted,
          providerOptions: part.providerMetadata
        });
        break;
      case "tool-result": {
        const output = await createToolModelOutput({
          toolCallId: part.toolCallId,
          input: part.input,
          tool: tools == null ? void 0 : tools[part.toolName],
          output: part.output,
          errorMode: "none"
        });
        content.push({
          type: "tool-result",
          toolCallId: part.toolCallId,
          toolName: part.toolName,
          output,
          providerOptions: part.providerMetadata
        });
        break;
      }
      case "tool-error": {
        const output = await createToolModelOutput({
          toolCallId: part.toolCallId,
          input: part.input,
          tool: tools == null ? void 0 : tools[part.toolName],
          output: part.error,
          errorMode: "json"
        });
        content.push({
          type: "tool-result",
          toolCallId: part.toolCallId,
          toolName: part.toolName,
          output,
          providerOptions: part.providerMetadata
        });
        break;
      }
      case "tool-approval-request":
        content.push({
          type: "tool-approval-request",
          approvalId: part.approvalId,
          toolCallId: part.toolCall.toolCallId
        });
        break;
    }
  }
  if (content.length > 0) {
    responseMessages.push({
      role: "assistant",
      content
    });
  }
  const toolResultContent = [];
  for (const part of inputContent) {
    if (!(part.type === "tool-result" || part.type === "tool-error") || part.providerExecuted) {
      continue;
    }
    const output = await createToolModelOutput({
      toolCallId: part.toolCallId,
      input: part.input,
      tool: tools == null ? void 0 : tools[part.toolName],
      output: part.type === "tool-result" ? part.output : part.error,
      errorMode: part.type === "tool-error" ? "text" : "none"
    });
    toolResultContent.push({
      type: "tool-result",
      toolCallId: part.toolCallId,
      toolName: part.toolName,
      output,
      ...part.providerMetadata != null ? { providerOptions: part.providerMetadata } : {}
    });
  }
  if (toolResultContent.length > 0) {
    responseMessages.push({
      role: "tool",
      content: toolResultContent
    });
  }
  return responseMessages;
}
function mergeAbortSignals(...signals) {
  const validSignals = signals.filter(
    (signal) => signal != null
  );
  if (validSignals.length === 0) {
    return void 0;
  }
  if (validSignals.length === 1) {
    return validSignals[0];
  }
  const controller = new AbortController();
  for (const signal of validSignals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener(
      "abort",
      () => {
        controller.abort(signal.reason);
      },
      { once: true }
    );
  }
  return controller.signal;
}
var originalGenerateId = createIdGenerator({
  prefix: "aitxt",
  size: 24
});
async function generateText({
  model: modelArg,
  tools,
  toolChoice,
  system,
  prompt,
  messages,
  allowSystemInMessages,
  maxRetries: maxRetriesArg,
  abortSignal,
  timeout,
  headers,
  stopWhen = stepCountIs(1),
  experimental_output,
  output = experimental_output,
  experimental_telemetry: telemetry,
  providerOptions,
  experimental_activeTools,
  activeTools = experimental_activeTools,
  experimental_prepareStep,
  prepareStep = experimental_prepareStep,
  experimental_repairToolCall: repairToolCall,
  experimental_download: download2,
  experimental_context,
  experimental_include: include,
  _internal: { generateId: generateId2 = originalGenerateId } = {},
  experimental_onStart: onStart,
  experimental_onStepStart: onStepStart,
  experimental_onToolCallStart: onToolCallStart,
  experimental_onToolCallFinish: onToolCallFinish,
  onStepFinish,
  onFinish,
  ...settings
}) {
  const model = resolveLanguageModel(modelArg);
  const createGlobalTelemetry = getGlobalTelemetryIntegration();
  const stopConditions = asArray(stopWhen);
  const totalTimeoutMs = getTotalTimeoutMs(timeout);
  const stepTimeoutMs = getStepTimeoutMs(timeout);
  const stepAbortController = stepTimeoutMs != null ? new AbortController() : void 0;
  const mergedAbortSignal = mergeAbortSignals(
    abortSignal,
    totalTimeoutMs != null ? AbortSignal.timeout(totalTimeoutMs) : void 0,
    stepAbortController == null ? void 0 : stepAbortController.signal
  );
  const { maxRetries, retry } = prepareRetries({
    maxRetries: maxRetriesArg,
    abortSignal: mergedAbortSignal
  });
  const callSettings = prepareCallSettings(settings);
  const headersWithUserAgent = withUserAgentSuffix(
    headers != null ? headers : {},
    `ai/${VERSION$1}`
  );
  const baseTelemetryAttributes = getBaseTelemetryAttributes({
    model,
    telemetry,
    headers: headersWithUserAgent,
    settings: { ...callSettings, maxRetries }
  });
  const modelInfo = { provider: model.provider, modelId: model.modelId };
  const initialPrompt = await standardizePrompt({
    system,
    prompt,
    messages,
    allowSystemInMessages
  });
  const globalTelemetry = createGlobalTelemetry(telemetry == null ? void 0 : telemetry.integrations);
  await notify({
    event: {
      model: modelInfo,
      system,
      prompt,
      messages,
      tools,
      toolChoice,
      activeTools,
      maxOutputTokens: callSettings.maxOutputTokens,
      temperature: callSettings.temperature,
      topP: callSettings.topP,
      topK: callSettings.topK,
      presencePenalty: callSettings.presencePenalty,
      frequencyPenalty: callSettings.frequencyPenalty,
      stopSequences: callSettings.stopSequences,
      seed: callSettings.seed,
      maxRetries,
      timeout,
      headers,
      providerOptions,
      stopWhen,
      output,
      abortSignal,
      include,
      functionId: telemetry == null ? void 0 : telemetry.functionId,
      metadata: telemetry == null ? void 0 : telemetry.metadata,
      experimental_context
    },
    callbacks: [
      onStart,
      globalTelemetry.onStart
    ]
  });
  const tracer = getTracer(telemetry);
  try {
    return await recordSpan({
      name: "ai.generateText",
      attributes: selectTelemetryAttributes({
        telemetry,
        attributes: {
          ...assembleOperationName({
            operationId: "ai.generateText",
            telemetry
          }),
          ...baseTelemetryAttributes,
          // model:
          "ai.model.provider": model.provider,
          "ai.model.id": model.modelId,
          // specific settings that only make sense on the outer level:
          "ai.prompt": {
            input: () => JSON.stringify({ system, prompt, messages })
          }
        }
      }),
      tracer,
      fn: async (span) => {
        var _a21, _b9, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
        const initialMessages = initialPrompt.messages;
        const responseMessages = [];
        const { approvedToolApprovals, deniedToolApprovals } = collectToolApprovals({ messages: initialMessages });
        const localApprovedToolApprovals = approvedToolApprovals.filter(
          (toolApproval) => !toolApproval.toolCall.providerExecuted
        );
        if (deniedToolApprovals.length > 0 || localApprovedToolApprovals.length > 0) {
          const toolOutputs = await executeTools({
            toolCalls: localApprovedToolApprovals.map(
              (toolApproval) => toolApproval.toolCall
            ),
            tools,
            tracer,
            telemetry,
            messages: initialMessages,
            abortSignal: mergedAbortSignal,
            experimental_context,
            stepNumber: 0,
            model: modelInfo,
            onToolCallStart: [
              onToolCallStart,
              globalTelemetry.onToolCallStart
            ],
            onToolCallFinish: [
              onToolCallFinish,
              globalTelemetry.onToolCallFinish
            ]
          });
          const toolContent = [];
          for (const output2 of toolOutputs) {
            const modelOutput = await createToolModelOutput({
              toolCallId: output2.toolCallId,
              input: output2.input,
              tool: tools == null ? void 0 : tools[output2.toolName],
              output: output2.type === "tool-result" ? output2.output : output2.error,
              errorMode: output2.type === "tool-error" ? "text" : "none"
            });
            toolContent.push({
              type: "tool-result",
              toolCallId: output2.toolCallId,
              toolName: output2.toolName,
              output: modelOutput
            });
          }
          for (const toolApproval of deniedToolApprovals) {
            toolContent.push({
              type: "tool-result",
              toolCallId: toolApproval.toolCall.toolCallId,
              toolName: toolApproval.toolCall.toolName,
              output: {
                type: "execution-denied",
                reason: toolApproval.approvalResponse.reason,
                // For provider-executed tools, include approvalId so provider can correlate
                ...toolApproval.toolCall.providerExecuted && {
                  providerOptions: {
                    openai: {
                      approvalId: toolApproval.approvalResponse.approvalId
                    }
                  }
                }
              }
            });
          }
          responseMessages.push({
            role: "tool",
            content: toolContent
          });
        }
        const callSettings2 = prepareCallSettings(settings);
        let currentModelResponse;
        let clientToolCalls = [];
        let clientToolOutputs = [];
        const steps = [];
        const pendingDeferredToolCalls = /* @__PURE__ */ new Map();
        do {
          const stepTimeoutId = stepTimeoutMs != null ? setTimeout(() => stepAbortController.abort(), stepTimeoutMs) : void 0;
          try {
            const stepInputMessages = [...initialMessages, ...responseMessages];
            const prepareStepResult = await (prepareStep == null ? void 0 : prepareStep({
              model,
              steps,
              stepNumber: steps.length,
              messages: stepInputMessages,
              experimental_context
            }));
            const stepModel = resolveLanguageModel(
              (_a21 = prepareStepResult == null ? void 0 : prepareStepResult.model) != null ? _a21 : model
            );
            const stepModelInfo = {
              provider: stepModel.provider,
              modelId: stepModel.modelId
            };
            const promptMessages = await convertToLanguageModelPrompt({
              prompt: {
                system: (_b9 = prepareStepResult == null ? void 0 : prepareStepResult.system) != null ? _b9 : initialPrompt.system,
                messages: (_c = prepareStepResult == null ? void 0 : prepareStepResult.messages) != null ? _c : stepInputMessages
              },
              supportedUrls: await stepModel.supportedUrls,
              download: download2
            });
            experimental_context = (_d = prepareStepResult == null ? void 0 : prepareStepResult.experimental_context) != null ? _d : experimental_context;
            const stepActiveTools = (_e = prepareStepResult == null ? void 0 : prepareStepResult.activeTools) != null ? _e : activeTools;
            const { toolChoice: stepToolChoice, tools: stepTools } = await prepareToolsAndToolChoice({
              tools,
              toolChoice: (_f = prepareStepResult == null ? void 0 : prepareStepResult.toolChoice) != null ? _f : toolChoice,
              activeTools: stepActiveTools
            });
            const stepMessages = (_g = prepareStepResult == null ? void 0 : prepareStepResult.messages) != null ? _g : stepInputMessages;
            const stepSystem = (_h = prepareStepResult == null ? void 0 : prepareStepResult.system) != null ? _h : initialPrompt.system;
            const stepProviderOptions = mergeObjects(
              providerOptions,
              prepareStepResult == null ? void 0 : prepareStepResult.providerOptions
            );
            await notify({
              event: {
                stepNumber: steps.length,
                model: stepModelInfo,
                system: stepSystem,
                messages: stepMessages,
                tools,
                toolChoice: stepToolChoice,
                activeTools: stepActiveTools,
                steps: [...steps],
                providerOptions: stepProviderOptions,
                timeout,
                headers,
                stopWhen,
                output,
                abortSignal,
                include,
                functionId: telemetry == null ? void 0 : telemetry.functionId,
                metadata: telemetry == null ? void 0 : telemetry.metadata,
                experimental_context
              },
              callbacks: [
                onStepStart,
                globalTelemetry.onStepStart
              ]
            });
            currentModelResponse = await retry(
              () => {
                var _a22;
                return recordSpan({
                  name: "ai.generateText.doGenerate",
                  attributes: selectTelemetryAttributes({
                    telemetry,
                    attributes: {
                      ...assembleOperationName({
                        operationId: "ai.generateText.doGenerate",
                        telemetry
                      }),
                      ...baseTelemetryAttributes,
                      // model:
                      "ai.model.provider": stepModel.provider,
                      "ai.model.id": stepModel.modelId,
                      // prompt:
                      "ai.prompt.messages": {
                        input: () => stringifyForTelemetry(promptMessages)
                      },
                      "ai.prompt.tools": {
                        // convert the language model level tools:
                        input: () => stepTools == null ? void 0 : stepTools.map((tool2) => JSON.stringify(tool2))
                      },
                      "ai.prompt.toolChoice": {
                        input: () => stepToolChoice != null ? JSON.stringify(stepToolChoice) : void 0
                      },
                      // standardized gen-ai llm span attributes:
                      "gen_ai.system": stepModel.provider,
                      "gen_ai.request.model": stepModel.modelId,
                      "gen_ai.request.frequency_penalty": settings.frequencyPenalty,
                      "gen_ai.request.max_tokens": settings.maxOutputTokens,
                      "gen_ai.request.presence_penalty": settings.presencePenalty,
                      "gen_ai.request.stop_sequences": settings.stopSequences,
                      "gen_ai.request.temperature": (_a22 = settings.temperature) != null ? _a22 : void 0,
                      "gen_ai.request.top_k": settings.topK,
                      "gen_ai.request.top_p": settings.topP
                    }
                  }),
                  tracer,
                  fn: async (span2) => {
                    var _a23, _b22, _c2, _d2, _e2, _f2, _g2, _h2;
                    const result = await stepModel.doGenerate({
                      ...callSettings2,
                      tools: stepTools,
                      toolChoice: stepToolChoice,
                      responseFormat: await (output == null ? void 0 : output.responseFormat),
                      prompt: promptMessages,
                      providerOptions: stepProviderOptions,
                      abortSignal: mergedAbortSignal,
                      headers: headersWithUserAgent
                    });
                    const responseData = {
                      id: (_b22 = (_a23 = result.response) == null ? void 0 : _a23.id) != null ? _b22 : generateId2(),
                      timestamp: (_d2 = (_c2 = result.response) == null ? void 0 : _c2.timestamp) != null ? _d2 : /* @__PURE__ */ new Date(),
                      modelId: (_f2 = (_e2 = result.response) == null ? void 0 : _e2.modelId) != null ? _f2 : stepModel.modelId,
                      headers: (_g2 = result.response) == null ? void 0 : _g2.headers,
                      body: (_h2 = result.response) == null ? void 0 : _h2.body
                    };
                    const usage = asLanguageModelUsage(result.usage);
                    span2.setAttributes(
                      await selectTelemetryAttributes({
                        telemetry,
                        attributes: {
                          "ai.response.finishReason": result.finishReason.unified,
                          "ai.response.text": {
                            output: () => extractTextContent(result.content)
                          },
                          "ai.response.reasoning": {
                            output: () => extractReasoningContent(result.content)
                          },
                          "ai.response.toolCalls": {
                            output: () => {
                              const toolCalls = asToolCalls(result.content);
                              return toolCalls == null ? void 0 : JSON.stringify(toolCalls);
                            }
                          },
                          "ai.response.id": responseData.id,
                          "ai.response.model": responseData.modelId,
                          "ai.response.timestamp": responseData.timestamp.toISOString(),
                          "ai.response.providerMetadata": JSON.stringify(
                            result.providerMetadata
                          ),
                          "ai.usage.inputTokens": result.usage.inputTokens.total,
                          "ai.usage.inputTokenDetails.noCacheTokens": result.usage.inputTokens.noCache,
                          "ai.usage.inputTokenDetails.cacheReadTokens": result.usage.inputTokens.cacheRead,
                          "ai.usage.inputTokenDetails.cacheWriteTokens": result.usage.inputTokens.cacheWrite,
                          "ai.usage.outputTokens": result.usage.outputTokens.total,
                          "ai.usage.outputTokenDetails.textTokens": result.usage.outputTokens.text,
                          "ai.usage.outputTokenDetails.reasoningTokens": result.usage.outputTokens.reasoning,
                          "ai.usage.totalTokens": usage.totalTokens,
                          "ai.usage.reasoningTokens": result.usage.outputTokens.reasoning,
                          "ai.usage.cachedInputTokens": result.usage.inputTokens.cacheRead,
                          // standardized gen-ai llm span attributes:
                          "gen_ai.response.finish_reasons": [
                            result.finishReason.unified
                          ],
                          "gen_ai.response.id": responseData.id,
                          "gen_ai.response.model": responseData.modelId,
                          "gen_ai.usage.input_tokens": result.usage.inputTokens.total,
                          "gen_ai.usage.output_tokens": result.usage.outputTokens.total
                        }
                      })
                    );
                    return { ...result, response: responseData };
                  }
                });
              }
            );
            const stepToolCalls = await Promise.all(
              currentModelResponse.content.filter(
                (part) => part.type === "tool-call"
              ).map(
                (toolCall) => parseToolCall({
                  toolCall,
                  tools,
                  repairToolCall,
                  system,
                  messages: stepInputMessages
                })
              )
            );
            const toolApprovalRequests = {};
            for (const toolCall of stepToolCalls) {
              if (toolCall.invalid) {
                continue;
              }
              const tool2 = tools == null ? void 0 : tools[toolCall.toolName];
              if (tool2 == null) {
                continue;
              }
              if ((tool2 == null ? void 0 : tool2.onInputAvailable) != null) {
                await tool2.onInputAvailable({
                  input: toolCall.input,
                  toolCallId: toolCall.toolCallId,
                  messages: stepInputMessages,
                  abortSignal: mergedAbortSignal,
                  experimental_context
                });
              }
              if (await isApprovalNeeded({
                tool: tool2,
                toolCall,
                messages: stepInputMessages,
                experimental_context
              })) {
                toolApprovalRequests[toolCall.toolCallId] = {
                  type: "tool-approval-request",
                  approvalId: generateId2(),
                  toolCall
                };
              }
            }
            const invalidToolCalls = stepToolCalls.filter(
              (toolCall) => toolCall.invalid && toolCall.dynamic
            );
            clientToolOutputs = [];
            for (const toolCall of invalidToolCalls) {
              clientToolOutputs.push({
                type: "tool-error",
                toolCallId: toolCall.toolCallId,
                toolName: toolCall.toolName,
                input: toolCall.input,
                error: getErrorMessage(toolCall.error),
                dynamic: true
              });
            }
            clientToolCalls = stepToolCalls.filter(
              (toolCall) => !toolCall.providerExecuted
            );
            if (tools != null) {
              clientToolOutputs.push(
                ...await executeTools({
                  toolCalls: clientToolCalls.filter(
                    (toolCall) => !toolCall.invalid && toolApprovalRequests[toolCall.toolCallId] == null
                  ),
                  tools,
                  tracer,
                  telemetry,
                  messages: stepInputMessages,
                  abortSignal: mergedAbortSignal,
                  experimental_context,
                  stepNumber: steps.length,
                  model: stepModelInfo,
                  onToolCallStart: [
                    onToolCallStart,
                    globalTelemetry.onToolCallStart
                  ],
                  onToolCallFinish: [
                    onToolCallFinish,
                    globalTelemetry.onToolCallFinish
                  ]
                })
              );
            }
            for (const toolCall of stepToolCalls) {
              if (!toolCall.providerExecuted)
                continue;
              const tool2 = tools == null ? void 0 : tools[toolCall.toolName];
              if ((tool2 == null ? void 0 : tool2.type) === "provider" && tool2.supportsDeferredResults) {
                const hasResultInResponse = currentModelResponse.content.some(
                  (part) => part.type === "tool-result" && part.toolCallId === toolCall.toolCallId
                );
                if (!hasResultInResponse) {
                  pendingDeferredToolCalls.set(toolCall.toolCallId, {
                    toolName: toolCall.toolName
                  });
                }
              }
            }
            for (const part of currentModelResponse.content) {
              if (part.type === "tool-result") {
                pendingDeferredToolCalls.delete(part.toolCallId);
              }
            }
            const stepContent = asContent({
              content: currentModelResponse.content,
              toolCalls: stepToolCalls,
              toolOutputs: clientToolOutputs,
              toolApprovalRequests: Object.values(toolApprovalRequests),
              tools
            });
            responseMessages.push(
              ...await toResponseMessages({
                content: stepContent,
                tools
              })
            );
            const stepRequest = ((_i = include == null ? void 0 : include.requestBody) != null ? _i : true) ? (_j = currentModelResponse.request) != null ? _j : {} : { ...currentModelResponse.request, body: void 0 };
            const stepResponse = {
              ...currentModelResponse.response,
              // deep clone msgs to avoid mutating past messages in multi-step:
              messages: structuredClone(responseMessages),
              // Conditionally include response body:
              body: ((_k = include == null ? void 0 : include.responseBody) != null ? _k : true) ? (_l = currentModelResponse.response) == null ? void 0 : _l.body : void 0
            };
            const stepNumber = steps.length;
            const currentStepResult = new DefaultStepResult({
              stepNumber,
              model: stepModelInfo,
              functionId: telemetry == null ? void 0 : telemetry.functionId,
              metadata: telemetry == null ? void 0 : telemetry.metadata,
              experimental_context,
              content: stepContent,
              finishReason: currentModelResponse.finishReason.unified,
              rawFinishReason: currentModelResponse.finishReason.raw,
              usage: asLanguageModelUsage(currentModelResponse.usage),
              warnings: currentModelResponse.warnings,
              providerMetadata: currentModelResponse.providerMetadata,
              request: stepRequest,
              response: stepResponse
            });
            logWarnings({
              warnings: (_m = currentModelResponse.warnings) != null ? _m : [],
              provider: stepModelInfo.provider,
              model: stepModelInfo.modelId
            });
            steps.push(currentStepResult);
            await notify({
              event: currentStepResult,
              callbacks: [onStepFinish, globalTelemetry.onStepFinish]
            });
          } finally {
            if (stepTimeoutId != null) {
              clearTimeout(stepTimeoutId);
            }
          }
        } while (
          // Continue if:
          // 1. There are client tool calls that have all been executed, OR
          // 2. There are pending deferred results from provider-executed tools
          (clientToolCalls.length > 0 && clientToolOutputs.length === clientToolCalls.length || pendingDeferredToolCalls.size > 0) && // continue until a stop condition is met:
          !await isStopConditionMet({ stopConditions, steps })
        );
        span.setAttributes(
          await selectTelemetryAttributes({
            telemetry,
            attributes: {
              "ai.response.finishReason": currentModelResponse.finishReason.unified,
              "ai.response.text": {
                output: () => extractTextContent(currentModelResponse.content)
              },
              "ai.response.reasoning": {
                output: () => extractReasoningContent(currentModelResponse.content)
              },
              "ai.response.toolCalls": {
                output: () => {
                  const toolCalls = asToolCalls(currentModelResponse.content);
                  return toolCalls == null ? void 0 : JSON.stringify(toolCalls);
                }
              },
              "ai.response.providerMetadata": JSON.stringify(
                currentModelResponse.providerMetadata
              )
            }
          })
        );
        const lastStep = steps[steps.length - 1];
        const totalUsage = steps.reduce(
          (totalUsage2, step) => {
            return addLanguageModelUsage(totalUsage2, step.usage);
          },
          {
            inputTokens: void 0,
            outputTokens: void 0,
            totalTokens: void 0,
            reasoningTokens: void 0,
            cachedInputTokens: void 0
          }
        );
        span.setAttributes(
          await selectTelemetryAttributes({
            telemetry,
            attributes: {
              "ai.usage.inputTokens": totalUsage.inputTokens,
              "ai.usage.inputTokenDetails.noCacheTokens": (_n = totalUsage.inputTokenDetails) == null ? void 0 : _n.noCacheTokens,
              "ai.usage.inputTokenDetails.cacheReadTokens": (_o = totalUsage.inputTokenDetails) == null ? void 0 : _o.cacheReadTokens,
              "ai.usage.inputTokenDetails.cacheWriteTokens": (_p = totalUsage.inputTokenDetails) == null ? void 0 : _p.cacheWriteTokens,
              "ai.usage.outputTokens": totalUsage.outputTokens,
              "ai.usage.outputTokenDetails.textTokens": (_q = totalUsage.outputTokenDetails) == null ? void 0 : _q.textTokens,
              "ai.usage.outputTokenDetails.reasoningTokens": (_r = totalUsage.outputTokenDetails) == null ? void 0 : _r.reasoningTokens,
              "ai.usage.totalTokens": totalUsage.totalTokens,
              "ai.usage.reasoningTokens": (_s = totalUsage.outputTokenDetails) == null ? void 0 : _s.reasoningTokens,
              "ai.usage.cachedInputTokens": (_t = totalUsage.inputTokenDetails) == null ? void 0 : _t.cacheReadTokens
            }
          })
        );
        await notify({
          event: {
            stepNumber: lastStep.stepNumber,
            model: lastStep.model,
            functionId: lastStep.functionId,
            metadata: lastStep.metadata,
            experimental_context: lastStep.experimental_context,
            finishReason: lastStep.finishReason,
            rawFinishReason: lastStep.rawFinishReason,
            usage: lastStep.usage,
            content: lastStep.content,
            text: lastStep.text,
            reasoningText: lastStep.reasoningText,
            reasoning: lastStep.reasoning,
            files: lastStep.files,
            sources: lastStep.sources,
            toolCalls: lastStep.toolCalls,
            staticToolCalls: lastStep.staticToolCalls,
            dynamicToolCalls: lastStep.dynamicToolCalls,
            toolResults: lastStep.toolResults,
            staticToolResults: lastStep.staticToolResults,
            dynamicToolResults: lastStep.dynamicToolResults,
            request: lastStep.request,
            response: lastStep.response,
            warnings: lastStep.warnings,
            providerMetadata: lastStep.providerMetadata,
            steps,
            totalUsage
          },
          callbacks: [
            onFinish,
            globalTelemetry.onFinish
          ]
        });
        let resolvedOutput;
        if (lastStep.finishReason === "stop") {
          const outputSpecification = output != null ? output : text();
          resolvedOutput = await outputSpecification.parseCompleteOutput(
            { text: lastStep.text },
            {
              response: lastStep.response,
              usage: lastStep.usage,
              finishReason: lastStep.finishReason
            }
          );
        }
        return new DefaultGenerateTextResult({
          steps,
          totalUsage,
          output: resolvedOutput
        });
      }
    });
  } catch (error) {
    throw wrapGatewayError(error);
  }
}
async function executeTools({
  toolCalls,
  tools,
  tracer,
  telemetry,
  messages,
  abortSignal,
  experimental_context,
  stepNumber,
  model,
  onToolCallStart,
  onToolCallFinish
}) {
  const toolOutputs = await Promise.all(
    toolCalls.map(
      async (toolCall) => executeToolCall({
        toolCall,
        tools,
        tracer,
        telemetry,
        messages,
        abortSignal,
        experimental_context,
        stepNumber,
        model,
        onToolCallStart,
        onToolCallFinish
      })
    )
  );
  return toolOutputs.filter(
    (output) => output != null
  );
}
var DefaultGenerateTextResult = class {
  constructor(options) {
    this.steps = options.steps;
    this._output = options.output;
    this.totalUsage = options.totalUsage;
  }
  get finalStep() {
    return this.steps[this.steps.length - 1];
  }
  get content() {
    return this.finalStep.content;
  }
  get text() {
    return this.finalStep.text;
  }
  get files() {
    return this.finalStep.files;
  }
  get reasoningText() {
    return this.finalStep.reasoningText;
  }
  get reasoning() {
    return this.finalStep.reasoning;
  }
  get toolCalls() {
    return this.finalStep.toolCalls;
  }
  get staticToolCalls() {
    return this.finalStep.staticToolCalls;
  }
  get dynamicToolCalls() {
    return this.finalStep.dynamicToolCalls;
  }
  get toolResults() {
    return this.finalStep.toolResults;
  }
  get staticToolResults() {
    return this.finalStep.staticToolResults;
  }
  get dynamicToolResults() {
    return this.finalStep.dynamicToolResults;
  }
  get sources() {
    return this.finalStep.sources;
  }
  get finishReason() {
    return this.finalStep.finishReason;
  }
  get rawFinishReason() {
    return this.finalStep.rawFinishReason;
  }
  get warnings() {
    return this.finalStep.warnings;
  }
  get providerMetadata() {
    return this.finalStep.providerMetadata;
  }
  get response() {
    return this.finalStep.response;
  }
  get request() {
    return this.finalStep.request;
  }
  get usage() {
    return this.finalStep.usage;
  }
  get experimental_output() {
    return this.output;
  }
  get output() {
    if (this._output == null) {
      throw new NoOutputGeneratedError();
    }
    return this._output;
  }
};
function asToolCalls(content) {
  const parts = content.filter(
    (part) => part.type === "tool-call"
  );
  if (parts.length === 0) {
    return void 0;
  }
  return parts.map((toolCall) => ({
    toolCallId: toolCall.toolCallId,
    toolName: toolCall.toolName,
    input: toolCall.input
  }));
}
function asContent({
  content,
  toolCalls,
  toolOutputs,
  toolApprovalRequests,
  tools
}) {
  const contentParts = [];
  for (const part of content) {
    switch (part.type) {
      case "text":
      case "reasoning":
      case "source":
        contentParts.push(part);
        break;
      case "file": {
        contentParts.push({
          type: "file",
          file: new DefaultGeneratedFile(part),
          ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
        });
        break;
      }
      case "tool-call": {
        contentParts.push(
          toolCalls.find((toolCall) => toolCall.toolCallId === part.toolCallId)
        );
        break;
      }
      case "tool-result": {
        const toolCall = toolCalls.find(
          (toolCall2) => toolCall2.toolCallId === part.toolCallId
        );
        if (toolCall == null) {
          const tool2 = tools == null ? void 0 : tools[part.toolName];
          const supportsDeferredResults = (tool2 == null ? void 0 : tool2.type) === "provider" && tool2.supportsDeferredResults;
          if (!supportsDeferredResults) {
            throw new Error(`Tool call ${part.toolCallId} not found.`);
          }
          if (part.isError) {
            contentParts.push({
              type: "tool-error",
              toolCallId: part.toolCallId,
              toolName: part.toolName,
              input: void 0,
              error: part.result,
              providerExecuted: true,
              dynamic: part.dynamic,
              ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
              ...(tool2 == null ? void 0 : tool2.metadata) != null ? { toolMetadata: tool2.metadata } : {}
            });
          } else {
            contentParts.push({
              type: "tool-result",
              toolCallId: part.toolCallId,
              toolName: part.toolName,
              input: void 0,
              output: part.result,
              providerExecuted: true,
              dynamic: part.dynamic,
              ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
              ...(tool2 == null ? void 0 : tool2.metadata) != null ? { toolMetadata: tool2.metadata } : {}
            });
          }
          break;
        }
        if (part.isError) {
          contentParts.push({
            type: "tool-error",
            toolCallId: part.toolCallId,
            toolName: part.toolName,
            input: toolCall.input,
            error: part.result,
            providerExecuted: true,
            dynamic: toolCall.dynamic,
            ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
            ...toolCall.toolMetadata != null ? { toolMetadata: toolCall.toolMetadata } : {}
          });
        } else {
          contentParts.push({
            type: "tool-result",
            toolCallId: part.toolCallId,
            toolName: part.toolName,
            input: toolCall.input,
            output: part.result,
            providerExecuted: true,
            dynamic: toolCall.dynamic,
            ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
            ...toolCall.toolMetadata != null ? { toolMetadata: toolCall.toolMetadata } : {}
          });
        }
        break;
      }
      case "tool-approval-request": {
        const toolCall = toolCalls.find(
          (toolCall2) => toolCall2.toolCallId === part.toolCallId
        );
        if (toolCall == null) {
          throw new ToolCallNotFoundForApprovalError({
            toolCallId: part.toolCallId,
            approvalId: part.approvalId
          });
        }
        contentParts.push({
          type: "tool-approval-request",
          approvalId: part.approvalId,
          toolCall
        });
        break;
      }
    }
  }
  return [...contentParts, ...toolOutputs, ...toolApprovalRequests];
}
function prepareHeaders(headers, defaultHeaders) {
  const responseHeaders = new Headers(headers != null ? headers : {});
  for (const [key, value] of Object.entries(defaultHeaders)) {
    if (!responseHeaders.has(key)) {
      responseHeaders.set(key, value);
    }
  }
  return responseHeaders;
}
function createTextStreamResponse({
  status,
  statusText,
  headers,
  textStream
}) {
  return new Response(textStream.pipeThrough(new TextEncoderStream()), {
    status: status != null ? status : 200,
    statusText,
    headers: prepareHeaders(headers, {
      "content-type": "text/plain; charset=utf-8"
    })
  });
}
function writeToServerResponse({
  response,
  status,
  statusText,
  headers,
  stream
}) {
  const statusCode = status != null ? status : 200;
  if (statusText !== void 0) {
    response.writeHead(statusCode, statusText, headers);
  } else {
    response.writeHead(statusCode, headers);
  }
  const reader = stream.getReader();
  const read = async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
        const canContinue = response.write(value);
        if (!canContinue) {
          await new Promise((resolve3) => {
            response.once("drain", resolve3);
          });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      response.end();
    }
  };
  read();
}
function pipeTextStreamToResponse({
  response,
  status,
  statusText,
  headers,
  textStream
}) {
  writeToServerResponse({
    response,
    status,
    statusText,
    headers: Object.fromEntries(
      prepareHeaders(headers, {
        "content-type": "text/plain; charset=utf-8"
      }).entries()
    ),
    stream: textStream.pipeThrough(new TextEncoderStream())
  });
}
var JsonToSseTransformStream = class extends TransformStream {
  constructor() {
    super({
      transform(part, controller) {
        controller.enqueue(`data: ${JSON.stringify(part)}

`);
      },
      flush(controller) {
        controller.enqueue("data: [DONE]\n\n");
      }
    });
  }
};
var UI_MESSAGE_STREAM_HEADERS = {
  "content-type": "text/event-stream",
  "cache-control": "no-cache",
  connection: "keep-alive",
  "x-vercel-ai-ui-message-stream": "v1",
  "x-accel-buffering": "no"
  // disable nginx buffering
};
function createUIMessageStreamResponse({
  status,
  statusText,
  headers,
  stream,
  consumeSseStream
}) {
  let sseStream = stream.pipeThrough(new JsonToSseTransformStream());
  if (consumeSseStream) {
    const [stream1, stream2] = sseStream.tee();
    sseStream = stream1;
    consumeSseStream({ stream: stream2 });
  }
  return new Response(sseStream.pipeThrough(new TextEncoderStream()), {
    status,
    statusText,
    headers: prepareHeaders(headers, UI_MESSAGE_STREAM_HEADERS)
  });
}
function getResponseUIMessageId({
  originalMessages,
  responseMessageId
}) {
  if (originalMessages == null) {
    return void 0;
  }
  const lastMessage = originalMessages[originalMessages.length - 1];
  return (lastMessage == null ? void 0 : lastMessage.role) === "assistant" ? lastMessage.id : typeof responseMessageId === "function" ? responseMessageId() : responseMessageId;
}
var toolMetadataSchema = record(
  string(),
  jsonValueSchema.optional()
);
var uiMessageChunkSchema = lazySchema(
  () => zodSchema(
    union([
      strictObject({
        type: literal("text-start"),
        id: string(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: literal("text-delta"),
        id: string(),
        delta: string(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: literal("text-end"),
        id: string(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: literal("error"),
        errorText: string()
      }),
      strictObject({
        type: literal("tool-input-start"),
        toolCallId: string(),
        toolName: string(),
        providerExecuted: boolean().optional(),
        providerMetadata: providerMetadataSchema.optional(),
        toolMetadata: toolMetadataSchema.optional(),
        dynamic: boolean().optional(),
        title: string().optional()
      }),
      strictObject({
        type: literal("tool-input-delta"),
        toolCallId: string(),
        inputTextDelta: string()
      }),
      strictObject({
        type: literal("tool-input-available"),
        toolCallId: string(),
        toolName: string(),
        input: unknown(),
        providerExecuted: boolean().optional(),
        providerMetadata: providerMetadataSchema.optional(),
        toolMetadata: toolMetadataSchema.optional(),
        dynamic: boolean().optional(),
        title: string().optional()
      }),
      strictObject({
        type: literal("tool-input-error"),
        toolCallId: string(),
        toolName: string(),
        input: unknown(),
        providerExecuted: boolean().optional(),
        providerMetadata: providerMetadataSchema.optional(),
        toolMetadata: toolMetadataSchema.optional(),
        dynamic: boolean().optional(),
        errorText: string(),
        title: string().optional()
      }),
      strictObject({
        type: literal("tool-approval-request"),
        approvalId: string(),
        toolCallId: string()
      }),
      strictObject({
        type: literal("tool-output-available"),
        toolCallId: string(),
        output: unknown(),
        providerExecuted: boolean().optional(),
        providerMetadata: providerMetadataSchema.optional(),
        toolMetadata: toolMetadataSchema.optional(),
        dynamic: boolean().optional(),
        preliminary: boolean().optional()
      }),
      strictObject({
        type: literal("tool-output-error"),
        toolCallId: string(),
        errorText: string(),
        providerExecuted: boolean().optional(),
        providerMetadata: providerMetadataSchema.optional(),
        toolMetadata: toolMetadataSchema.optional(),
        dynamic: boolean().optional()
      }),
      strictObject({
        type: literal("tool-output-denied"),
        toolCallId: string()
      }),
      strictObject({
        type: literal("reasoning-start"),
        id: string(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: literal("reasoning-delta"),
        id: string(),
        delta: string(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: literal("reasoning-end"),
        id: string(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: literal("source-url"),
        sourceId: string(),
        url: string(),
        title: string().optional(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: literal("source-document"),
        sourceId: string(),
        mediaType: string(),
        title: string(),
        filename: string().optional(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: literal("file"),
        url: string(),
        mediaType: string(),
        providerMetadata: providerMetadataSchema.optional()
      }),
      strictObject({
        type: custom(
          (value) => typeof value === "string" && value.startsWith("data-"),
          { message: 'Type must start with "data-"' }
        ),
        id: string().optional(),
        data: unknown(),
        transient: boolean().optional()
      }),
      strictObject({
        type: literal("start-step")
      }),
      strictObject({
        type: literal("finish-step")
      }),
      strictObject({
        type: literal("start"),
        messageId: string().optional(),
        messageMetadata: unknown().optional()
      }),
      strictObject({
        type: literal("finish"),
        finishReason: _enum([
          "stop",
          "length",
          "content-filter",
          "tool-calls",
          "error",
          "other"
        ]).optional(),
        messageMetadata: unknown().optional()
      }),
      strictObject({
        type: literal("abort"),
        reason: string().optional()
      }),
      strictObject({
        type: literal("message-metadata"),
        messageMetadata: unknown()
      })
    ])
  )
);
function isDataUIMessageChunk(chunk) {
  return chunk.type.startsWith("data-");
}
function isDataUIPart(part) {
  return part.type.startsWith("data-");
}
function isTextUIPart(part) {
  return part.type === "text";
}
function isFileUIPart(part) {
  return part.type === "file";
}
function isReasoningUIPart(part) {
  return part.type === "reasoning";
}
function isStaticToolUIPart(part) {
  return part.type.startsWith("tool-");
}
function isDynamicToolUIPart(part) {
  return part.type === "dynamic-tool";
}
function isToolUIPart(part) {
  return isStaticToolUIPart(part) || isDynamicToolUIPart(part);
}
function getStaticToolName(part) {
  return part.type.split("-").slice(1).join("-");
}
function getToolName(part) {
  return isDynamicToolUIPart(part) ? part.toolName : getStaticToolName(part);
}
function createStreamingUIMessageState({
  lastMessage,
  messageId
}) {
  return {
    message: (lastMessage == null ? void 0 : lastMessage.role) === "assistant" ? lastMessage : {
      id: messageId,
      metadata: void 0,
      role: "assistant",
      parts: []
    },
    activeTextParts: {},
    activeReasoningParts: {},
    partialToolCalls: {}
  };
}
function processUIMessageStream({
  stream,
  messageMetadataSchema,
  dataPartSchemas,
  runUpdateMessageJob,
  onError,
  onToolCall,
  onData
}) {
  return stream.pipeThrough(
    new TransformStream({
      async transform(chunk, controller) {
        await runUpdateMessageJob(async ({ state, write }) => {
          var _a21, _b9, _c, _d;
          function getToolInvocation(toolCallId) {
            const toolInvocations = state.message.parts.filter(isToolUIPart);
            const toolInvocation = toolInvocations.find(
              (invocation) => invocation.toolCallId === toolCallId
            );
            if (toolInvocation == null) {
              throw new UIMessageStreamError({
                chunkType: "tool-invocation",
                chunkId: toolCallId,
                message: `No tool invocation found for tool call ID "${toolCallId}".`
              });
            }
            return toolInvocation;
          }
          function updateToolPart(options) {
            var _a22;
            const part = state.message.parts.find(
              (part2) => isStaticToolUIPart(part2) && part2.toolCallId === options.toolCallId
            );
            const anyOptions = options;
            const anyPart = part;
            if (part != null) {
              part.state = options.state;
              anyPart.input = anyOptions.input;
              anyPart.output = anyOptions.output;
              anyPart.errorText = anyOptions.errorText;
              anyPart.rawInput = anyOptions.rawInput;
              anyPart.preliminary = anyOptions.preliminary;
              if (options.title !== void 0) {
                anyPart.title = options.title;
              }
              if (options.toolMetadata !== void 0) {
                anyPart.toolMetadata = options.toolMetadata;
              }
              anyPart.providerExecuted = (_a22 = anyOptions.providerExecuted) != null ? _a22 : part.providerExecuted;
              const providerMetadata = anyOptions.providerMetadata;
              if (providerMetadata != null) {
                if (options.state === "output-available" || options.state === "output-error") {
                  const resultPart = part;
                  resultPart.resultProviderMetadata = providerMetadata;
                } else {
                  part.callProviderMetadata = providerMetadata;
                }
              }
            } else {
              state.message.parts.push({
                type: `tool-${options.toolName}`,
                toolCallId: options.toolCallId,
                state: options.state,
                title: options.title,
                ...options.toolMetadata !== void 0 ? { toolMetadata: options.toolMetadata } : {},
                input: anyOptions.input,
                output: anyOptions.output,
                rawInput: anyOptions.rawInput,
                errorText: anyOptions.errorText,
                providerExecuted: anyOptions.providerExecuted,
                preliminary: anyOptions.preliminary,
                ...anyOptions.providerMetadata != null && (options.state === "output-available" || options.state === "output-error") ? { resultProviderMetadata: anyOptions.providerMetadata } : {},
                ...anyOptions.providerMetadata != null && !(options.state === "output-available" || options.state === "output-error") ? { callProviderMetadata: anyOptions.providerMetadata } : {}
              });
            }
          }
          function updateDynamicToolPart(options) {
            var _a22, _b22;
            const part = state.message.parts.find(
              (part2) => part2.type === "dynamic-tool" && part2.toolCallId === options.toolCallId
            );
            const anyOptions = options;
            const anyPart = part;
            if (part != null) {
              part.state = options.state;
              anyPart.toolName = options.toolName;
              anyPart.input = anyOptions.input;
              anyPart.output = anyOptions.output;
              anyPart.errorText = anyOptions.errorText;
              anyPart.rawInput = (_a22 = anyOptions.rawInput) != null ? _a22 : anyPart.rawInput;
              anyPart.preliminary = anyOptions.preliminary;
              if (options.title !== void 0) {
                anyPart.title = options.title;
              }
              if (options.toolMetadata !== void 0) {
                anyPart.toolMetadata = options.toolMetadata;
              }
              anyPart.providerExecuted = (_b22 = anyOptions.providerExecuted) != null ? _b22 : part.providerExecuted;
              const providerMetadata = anyOptions.providerMetadata;
              if (providerMetadata != null) {
                if (options.state === "output-available" || options.state === "output-error") {
                  const resultPart = part;
                  resultPart.resultProviderMetadata = providerMetadata;
                } else {
                  part.callProviderMetadata = providerMetadata;
                }
              }
            } else {
              state.message.parts.push({
                type: "dynamic-tool",
                toolName: options.toolName,
                toolCallId: options.toolCallId,
                state: options.state,
                input: anyOptions.input,
                output: anyOptions.output,
                errorText: anyOptions.errorText,
                preliminary: anyOptions.preliminary,
                providerExecuted: anyOptions.providerExecuted,
                title: options.title,
                ...options.toolMetadata !== void 0 ? { toolMetadata: options.toolMetadata } : {},
                ...anyOptions.providerMetadata != null && (options.state === "output-available" || options.state === "output-error") ? { resultProviderMetadata: anyOptions.providerMetadata } : {},
                ...anyOptions.providerMetadata != null && !(options.state === "output-available" || options.state === "output-error") ? { callProviderMetadata: anyOptions.providerMetadata } : {}
              });
            }
          }
          async function updateMessageMetadata(metadata) {
            if (metadata != null) {
              const mergedMetadata = state.message.metadata != null ? mergeObjects(state.message.metadata, metadata) : metadata;
              if (messageMetadataSchema != null) {
                await validateTypes({
                  value: mergedMetadata,
                  schema: messageMetadataSchema,
                  context: {
                    field: "message.metadata",
                    entityId: state.message.id
                  }
                });
              }
              state.message.metadata = mergedMetadata;
            }
          }
          switch (chunk.type) {
            case "text-start": {
              const textPart = {
                type: "text",
                text: "",
                providerMetadata: chunk.providerMetadata,
                state: "streaming"
              };
              state.activeTextParts[chunk.id] = textPart;
              state.message.parts.push(textPart);
              write();
              break;
            }
            case "text-delta": {
              const textPart = state.activeTextParts[chunk.id];
              if (textPart == null) {
                throw new UIMessageStreamError({
                  chunkType: "text-delta",
                  chunkId: chunk.id,
                  message: `Received text-delta for missing text part with ID "${chunk.id}". Ensure a "text-start" chunk is sent before any "text-delta" chunks.`
                });
              }
              textPart.text += chunk.delta;
              textPart.providerMetadata = (_a21 = chunk.providerMetadata) != null ? _a21 : textPart.providerMetadata;
              write();
              break;
            }
            case "text-end": {
              const textPart = state.activeTextParts[chunk.id];
              if (textPart == null) {
                throw new UIMessageStreamError({
                  chunkType: "text-end",
                  chunkId: chunk.id,
                  message: `Received text-end for missing text part with ID "${chunk.id}". Ensure a "text-start" chunk is sent before any "text-end" chunks.`
                });
              }
              textPart.state = "done";
              textPart.providerMetadata = (_b9 = chunk.providerMetadata) != null ? _b9 : textPart.providerMetadata;
              delete state.activeTextParts[chunk.id];
              write();
              break;
            }
            case "reasoning-start": {
              const reasoningPart = {
                type: "reasoning",
                text: "",
                providerMetadata: chunk.providerMetadata,
                state: "streaming"
              };
              state.activeReasoningParts[chunk.id] = reasoningPart;
              state.message.parts.push(reasoningPart);
              write();
              break;
            }
            case "reasoning-delta": {
              const reasoningPart = state.activeReasoningParts[chunk.id];
              if (reasoningPart == null) {
                throw new UIMessageStreamError({
                  chunkType: "reasoning-delta",
                  chunkId: chunk.id,
                  message: `Received reasoning-delta for missing reasoning part with ID "${chunk.id}". Ensure a "reasoning-start" chunk is sent before any "reasoning-delta" chunks.`
                });
              }
              reasoningPart.text += chunk.delta;
              reasoningPart.providerMetadata = (_c = chunk.providerMetadata) != null ? _c : reasoningPart.providerMetadata;
              write();
              break;
            }
            case "reasoning-end": {
              const reasoningPart = state.activeReasoningParts[chunk.id];
              if (reasoningPart == null) {
                throw new UIMessageStreamError({
                  chunkType: "reasoning-end",
                  chunkId: chunk.id,
                  message: `Received reasoning-end for missing reasoning part with ID "${chunk.id}". Ensure a "reasoning-start" chunk is sent before any "reasoning-end" chunks.`
                });
              }
              reasoningPart.providerMetadata = (_d = chunk.providerMetadata) != null ? _d : reasoningPart.providerMetadata;
              reasoningPart.state = "done";
              delete state.activeReasoningParts[chunk.id];
              write();
              break;
            }
            case "file": {
              state.message.parts.push({
                type: "file",
                mediaType: chunk.mediaType,
                url: chunk.url,
                ...chunk.providerMetadata != null ? { providerMetadata: chunk.providerMetadata } : {}
              });
              write();
              break;
            }
            case "source-url": {
              state.message.parts.push({
                type: "source-url",
                sourceId: chunk.sourceId,
                url: chunk.url,
                title: chunk.title,
                providerMetadata: chunk.providerMetadata
              });
              write();
              break;
            }
            case "source-document": {
              state.message.parts.push({
                type: "source-document",
                sourceId: chunk.sourceId,
                mediaType: chunk.mediaType,
                title: chunk.title,
                filename: chunk.filename,
                providerMetadata: chunk.providerMetadata
              });
              write();
              break;
            }
            case "tool-input-start": {
              const toolInvocations = state.message.parts.filter(isStaticToolUIPart);
              state.partialToolCalls[chunk.toolCallId] = {
                text: "",
                toolName: chunk.toolName,
                index: toolInvocations.length,
                dynamic: chunk.dynamic,
                title: chunk.title,
                toolMetadata: chunk.toolMetadata
              };
              if (chunk.dynamic) {
                updateDynamicToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: chunk.toolName,
                  state: "input-streaming",
                  input: void 0,
                  providerExecuted: chunk.providerExecuted,
                  title: chunk.title,
                  toolMetadata: chunk.toolMetadata,
                  providerMetadata: chunk.providerMetadata
                });
              } else {
                updateToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: chunk.toolName,
                  state: "input-streaming",
                  input: void 0,
                  providerExecuted: chunk.providerExecuted,
                  title: chunk.title,
                  toolMetadata: chunk.toolMetadata,
                  providerMetadata: chunk.providerMetadata
                });
              }
              write();
              break;
            }
            case "tool-input-delta": {
              const partialToolCall = state.partialToolCalls[chunk.toolCallId];
              if (partialToolCall == null) {
                throw new UIMessageStreamError({
                  chunkType: "tool-input-delta",
                  chunkId: chunk.toolCallId,
                  message: `Received tool-input-delta for missing tool call with ID "${chunk.toolCallId}". Ensure a "tool-input-start" chunk is sent before any "tool-input-delta" chunks.`
                });
              }
              partialToolCall.text += chunk.inputTextDelta;
              const { value: partialArgs } = await parsePartialJson(
                partialToolCall.text
              );
              if (partialToolCall.dynamic) {
                updateDynamicToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: partialToolCall.toolName,
                  state: "input-streaming",
                  input: partialArgs,
                  title: partialToolCall.title,
                  toolMetadata: partialToolCall.toolMetadata
                });
              } else {
                updateToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: partialToolCall.toolName,
                  state: "input-streaming",
                  input: partialArgs,
                  title: partialToolCall.title,
                  toolMetadata: partialToolCall.toolMetadata
                });
              }
              write();
              break;
            }
            case "tool-input-available": {
              if (chunk.dynamic) {
                updateDynamicToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: chunk.toolName,
                  state: "input-available",
                  input: chunk.input,
                  providerExecuted: chunk.providerExecuted,
                  providerMetadata: chunk.providerMetadata,
                  title: chunk.title,
                  toolMetadata: chunk.toolMetadata
                });
              } else {
                updateToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: chunk.toolName,
                  state: "input-available",
                  input: chunk.input,
                  providerExecuted: chunk.providerExecuted,
                  providerMetadata: chunk.providerMetadata,
                  title: chunk.title,
                  toolMetadata: chunk.toolMetadata
                });
              }
              write();
              if (onToolCall && !chunk.providerExecuted) {
                await onToolCall({
                  toolCall: chunk
                });
              }
              break;
            }
            case "tool-input-error": {
              const existingPart = state.message.parts.filter(isToolUIPart).find((p) => p.toolCallId === chunk.toolCallId);
              const isDynamic = existingPart != null ? existingPart.type === "dynamic-tool" : !!chunk.dynamic;
              if (isDynamic) {
                updateDynamicToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: chunk.toolName,
                  state: "output-error",
                  input: chunk.input,
                  errorText: chunk.errorText,
                  providerExecuted: chunk.providerExecuted,
                  providerMetadata: chunk.providerMetadata,
                  toolMetadata: chunk.toolMetadata
                });
              } else {
                updateToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: chunk.toolName,
                  state: "output-error",
                  input: void 0,
                  rawInput: chunk.input,
                  errorText: chunk.errorText,
                  providerExecuted: chunk.providerExecuted,
                  providerMetadata: chunk.providerMetadata,
                  toolMetadata: chunk.toolMetadata
                });
              }
              write();
              break;
            }
            case "tool-approval-request": {
              const toolInvocation = getToolInvocation(chunk.toolCallId);
              toolInvocation.state = "approval-requested";
              toolInvocation.approval = { id: chunk.approvalId };
              write();
              break;
            }
            case "tool-output-denied": {
              const toolInvocation = getToolInvocation(chunk.toolCallId);
              toolInvocation.state = "output-denied";
              write();
              break;
            }
            case "tool-output-available": {
              const toolInvocation = getToolInvocation(chunk.toolCallId);
              if (toolInvocation.type === "dynamic-tool") {
                updateDynamicToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: toolInvocation.toolName,
                  state: "output-available",
                  input: toolInvocation.input,
                  output: chunk.output,
                  preliminary: chunk.preliminary,
                  providerExecuted: chunk.providerExecuted,
                  providerMetadata: chunk.providerMetadata,
                  title: toolInvocation.title,
                  toolMetadata: toolInvocation.toolMetadata
                });
              } else {
                updateToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: getStaticToolName(toolInvocation),
                  state: "output-available",
                  input: toolInvocation.input,
                  output: chunk.output,
                  providerExecuted: chunk.providerExecuted,
                  preliminary: chunk.preliminary,
                  providerMetadata: chunk.providerMetadata,
                  title: toolInvocation.title,
                  toolMetadata: toolInvocation.toolMetadata
                });
              }
              write();
              break;
            }
            case "tool-output-error": {
              const toolInvocation = getToolInvocation(chunk.toolCallId);
              if (toolInvocation.type === "dynamic-tool") {
                updateDynamicToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: toolInvocation.toolName,
                  state: "output-error",
                  input: toolInvocation.input,
                  errorText: chunk.errorText,
                  providerExecuted: chunk.providerExecuted,
                  providerMetadata: chunk.providerMetadata,
                  title: toolInvocation.title,
                  toolMetadata: toolInvocation.toolMetadata
                });
              } else {
                updateToolPart({
                  toolCallId: chunk.toolCallId,
                  toolName: getStaticToolName(toolInvocation),
                  state: "output-error",
                  input: toolInvocation.input,
                  rawInput: toolInvocation.rawInput,
                  errorText: chunk.errorText,
                  providerExecuted: chunk.providerExecuted,
                  providerMetadata: chunk.providerMetadata,
                  title: toolInvocation.title,
                  toolMetadata: toolInvocation.toolMetadata
                });
              }
              write();
              break;
            }
            case "start-step": {
              state.message.parts.push({ type: "step-start" });
              break;
            }
            case "finish-step": {
              state.activeTextParts = {};
              state.activeReasoningParts = {};
              break;
            }
            case "start": {
              if (chunk.messageId != null) {
                state.message.id = chunk.messageId;
              }
              await updateMessageMetadata(chunk.messageMetadata);
              if (chunk.messageId != null || chunk.messageMetadata != null) {
                write();
              }
              break;
            }
            case "finish": {
              if (chunk.finishReason != null) {
                state.finishReason = chunk.finishReason;
              }
              await updateMessageMetadata(chunk.messageMetadata);
              if (chunk.messageMetadata != null) {
                write();
              }
              break;
            }
            case "message-metadata": {
              await updateMessageMetadata(chunk.messageMetadata);
              if (chunk.messageMetadata != null) {
                write();
              }
              break;
            }
            case "error": {
              onError == null ? void 0 : onError(new Error(chunk.errorText));
              break;
            }
            default: {
              if (isDataUIMessageChunk(chunk)) {
                if ((dataPartSchemas == null ? void 0 : dataPartSchemas[chunk.type]) != null) {
                  const partIdx = state.message.parts.findIndex(
                    (p) => "id" in p && "data" in p && p.id === chunk.id && p.type === chunk.type
                  );
                  const actualPartIdx = partIdx >= 0 ? partIdx : state.message.parts.length;
                  await validateTypes({
                    value: chunk.data,
                    schema: dataPartSchemas[chunk.type],
                    context: {
                      field: `message.parts[${actualPartIdx}].data`,
                      entityName: chunk.type,
                      entityId: chunk.id
                    }
                  });
                }
                const dataChunk = chunk;
                if (dataChunk.transient) {
                  onData == null ? void 0 : onData(dataChunk);
                  break;
                }
                const existingUIPart = dataChunk.id != null ? state.message.parts.find(
                  (chunkArg) => dataChunk.type === chunkArg.type && dataChunk.id === chunkArg.id
                ) : void 0;
                if (existingUIPart != null) {
                  existingUIPart.data = dataChunk.data;
                } else {
                  state.message.parts.push(dataChunk);
                }
                onData == null ? void 0 : onData(dataChunk);
                write();
              }
            }
          }
          controller.enqueue(chunk);
        });
      }
    })
  );
}
function handleUIMessageStreamFinish({
  messageId,
  originalMessages = [],
  onStepFinish,
  onFinish,
  onError,
  stream
}) {
  let lastMessage = originalMessages == null ? void 0 : originalMessages[originalMessages.length - 1];
  if ((lastMessage == null ? void 0 : lastMessage.role) !== "assistant") {
    lastMessage = void 0;
  } else {
    messageId = lastMessage.id;
  }
  let isAborted2 = false;
  const idInjectedStream = stream.pipeThrough(
    new TransformStream({
      transform(chunk, controller) {
        if (chunk.type === "start") {
          const startChunk = chunk;
          if (startChunk.messageId == null && messageId != null) {
            startChunk.messageId = messageId;
          }
        }
        if (chunk.type === "abort") {
          isAborted2 = true;
        }
        controller.enqueue(chunk);
      }
    })
  );
  if (onFinish == null && onStepFinish == null) {
    return idInjectedStream;
  }
  const state = createStreamingUIMessageState({
    lastMessage: lastMessage ? structuredClone(lastMessage) : void 0,
    messageId: messageId != null ? messageId : ""
    // will be overridden by the stream
  });
  const runUpdateMessageJob = async (job) => {
    await job({ state, write: () => {
    } });
  };
  let finishCalled = false;
  const callOnFinish = async () => {
    if (finishCalled || !onFinish) {
      return;
    }
    finishCalled = true;
    const isContinuation = state.message.id === (lastMessage == null ? void 0 : lastMessage.id);
    await onFinish({
      isAborted: isAborted2,
      isContinuation,
      responseMessage: state.message,
      messages: [
        ...isContinuation ? originalMessages.slice(0, -1) : originalMessages,
        state.message
      ],
      finishReason: state.finishReason
    });
  };
  const callOnStepFinish = async () => {
    if (!onStepFinish) {
      return;
    }
    const isContinuation = state.message.id === (lastMessage == null ? void 0 : lastMessage.id);
    try {
      await onStepFinish({
        isContinuation,
        responseMessage: structuredClone(state.message),
        messages: [
          ...isContinuation ? originalMessages.slice(0, -1) : originalMessages,
          structuredClone(state.message)
        ]
      });
    } catch (error) {
      onError(error);
    }
  };
  return processUIMessageStream({
    stream: idInjectedStream,
    runUpdateMessageJob,
    onError
  }).pipeThrough(
    new TransformStream({
      async transform(chunk, controller) {
        if (chunk.type === "finish-step") {
          await callOnStepFinish();
        }
        controller.enqueue(chunk);
      },
      // @ts-expect-error cancel is still new and missing from types https://developer.mozilla.org/en-US/docs/Web/API/TransformStream#browser_compatibility
      async cancel() {
        await callOnFinish();
      },
      async flush() {
        await callOnFinish();
      }
    })
  );
}
function pipeUIMessageStreamToResponse({
  response,
  status,
  statusText,
  headers,
  stream,
  consumeSseStream
}) {
  let sseStream = stream.pipeThrough(new JsonToSseTransformStream());
  if (consumeSseStream) {
    const [stream1, stream2] = sseStream.tee();
    sseStream = stream1;
    consumeSseStream({ stream: stream2 });
  }
  writeToServerResponse({
    response,
    status,
    statusText,
    headers: Object.fromEntries(
      prepareHeaders(headers, UI_MESSAGE_STREAM_HEADERS).entries()
    ),
    stream: sseStream.pipeThrough(new TextEncoderStream())
  });
}
function createAsyncIterableStream(source) {
  const stream = source.pipeThrough(new TransformStream());
  stream[Symbol.asyncIterator] = function() {
    const reader = this.getReader();
    let finished = false;
    async function cleanup(cancelStream) {
      var _a21;
      if (finished)
        return;
      finished = true;
      try {
        if (cancelStream) {
          await ((_a21 = reader.cancel) == null ? void 0 : _a21.call(reader));
        }
      } finally {
        try {
          reader.releaseLock();
        } catch (e) {
        }
      }
    }
    return {
      /**
       * Reads the next chunk from the stream.
       * @returns A promise resolving to the next IteratorResult.
       */
      async next() {
        if (finished) {
          return { done: true, value: void 0 };
        }
        const { done, value } = await reader.read();
        if (done) {
          await cleanup(true);
          return { done: true, value: void 0 };
        }
        return { done: false, value };
      },
      /**
       * May be called on early exit (e.g., break from for-await) or after completion.
       * Ensures the stream is cancelled and resources are released.
       * @returns A promise resolving to a completed IteratorResult.
       */
      async return() {
        await cleanup(true);
        return { done: true, value: void 0 };
      },
      /**
       * Called on early exit with error.
       * Ensures the stream is cancelled and resources are released, then rethrows the error.
       * @param err The error to throw.
       * @returns A promise that rejects with the provided error.
       */
      async throw(err) {
        await cleanup(true);
        throw err;
      }
    };
  };
  return stream;
}
async function consumeStream({
  stream,
  onError
}) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done } = await reader.read();
      if (done)
        break;
    }
  } catch (error) {
    onError == null ? void 0 : onError(error);
  } finally {
    reader.releaseLock();
  }
}
function createResolvablePromise() {
  let resolve3;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve3 = res;
    reject = rej;
  });
  return {
    promise,
    resolve: resolve3,
    reject
  };
}
function createStitchableStream() {
  let innerStreamReaders = [];
  let controller = null;
  let isClosed = false;
  let waitForNewStream = createResolvablePromise();
  const terminate = () => {
    isClosed = true;
    waitForNewStream.resolve();
    innerStreamReaders.forEach((reader) => reader.cancel());
    innerStreamReaders = [];
    controller == null ? void 0 : controller.close();
  };
  const processPull = async () => {
    if (isClosed && innerStreamReaders.length === 0) {
      controller == null ? void 0 : controller.close();
      return;
    }
    if (innerStreamReaders.length === 0) {
      waitForNewStream = createResolvablePromise();
      await waitForNewStream.promise;
      return processPull();
    }
    try {
      const { value, done } = await innerStreamReaders[0].read();
      if (done) {
        innerStreamReaders.shift();
        if (innerStreamReaders.length === 0 && isClosed) {
          controller == null ? void 0 : controller.close();
        } else {
          await processPull();
        }
      } else {
        controller == null ? void 0 : controller.enqueue(value);
      }
    } catch (error) {
      controller == null ? void 0 : controller.error(error);
      innerStreamReaders.shift();
      terminate();
    }
  };
  return {
    stream: new ReadableStream({
      start(controllerParam) {
        controller = controllerParam;
      },
      pull: processPull,
      async cancel() {
        for (const reader of innerStreamReaders) {
          await reader.cancel();
        }
        innerStreamReaders = [];
        isClosed = true;
      }
    }),
    addStream: (innerStream) => {
      if (isClosed) {
        throw new Error("Cannot add inner stream: outer stream is closed");
      }
      innerStreamReaders.push(innerStream.getReader());
      waitForNewStream.resolve();
    },
    /**
     * Gracefully close the outer stream. This will let the inner streams
     * finish processing and then close the outer stream.
     */
    close: () => {
      isClosed = true;
      waitForNewStream.resolve();
      if (innerStreamReaders.length === 0) {
        controller == null ? void 0 : controller.close();
      }
    },
    /**
     * Immediately close the outer stream. This will cancel all inner streams
     * and close the outer stream.
     */
    terminate
  };
}
function runToolsTransformation({
  tools,
  generatorStream,
  tracer,
  telemetry,
  system,
  messages,
  abortSignal,
  repairToolCall,
  experimental_context,
  generateId: generateId2,
  stepNumber,
  model,
  onToolCallStart,
  onToolCallFinish
}) {
  let toolResultsStreamController = null;
  const toolResultsStream = new ReadableStream({
    start(controller) {
      toolResultsStreamController = controller;
    }
  });
  const outstandingToolResults = /* @__PURE__ */ new Set();
  const toolInputs = /* @__PURE__ */ new Map();
  const toolCallsByToolCallId = /* @__PURE__ */ new Map();
  let canClose = false;
  let finishChunk = void 0;
  function attemptClose() {
    if (canClose && outstandingToolResults.size === 0) {
      if (finishChunk != null) {
        toolResultsStreamController.enqueue(finishChunk);
      }
      toolResultsStreamController.close();
    }
  }
  const forwardStream = new TransformStream({
    async transform(chunk, controller) {
      const chunkType = chunk.type;
      switch (chunkType) {
        case "stream-start":
        case "text-start":
        case "text-delta":
        case "text-end":
        case "reasoning-start":
        case "reasoning-delta":
        case "reasoning-end":
        case "tool-input-start":
        case "tool-input-delta":
        case "tool-input-end":
        case "source":
        case "response-metadata":
        case "error":
        case "raw": {
          controller.enqueue(chunk);
          break;
        }
        case "file": {
          controller.enqueue({
            type: "file",
            file: new DefaultGeneratedFileWithType({
              data: chunk.data,
              mediaType: chunk.mediaType
            }),
            ...chunk.providerMetadata != null ? { providerMetadata: chunk.providerMetadata } : {}
          });
          break;
        }
        case "finish": {
          finishChunk = {
            type: "finish",
            finishReason: chunk.finishReason.unified,
            rawFinishReason: chunk.finishReason.raw,
            usage: asLanguageModelUsage(chunk.usage),
            providerMetadata: chunk.providerMetadata
          };
          break;
        }
        case "tool-approval-request": {
          const toolCall = toolCallsByToolCallId.get(chunk.toolCallId);
          if (toolCall == null) {
            toolResultsStreamController.enqueue({
              type: "error",
              error: new ToolCallNotFoundForApprovalError({
                toolCallId: chunk.toolCallId,
                approvalId: chunk.approvalId
              })
            });
            break;
          }
          controller.enqueue({
            type: "tool-approval-request",
            approvalId: chunk.approvalId,
            toolCall
          });
          break;
        }
        case "tool-call": {
          try {
            const toolCall = await parseToolCall({
              toolCall: chunk,
              tools,
              repairToolCall,
              system,
              messages
            });
            toolCallsByToolCallId.set(toolCall.toolCallId, toolCall);
            controller.enqueue(toolCall);
            if (toolCall.invalid) {
              toolResultsStreamController.enqueue({
                type: "tool-error",
                toolCallId: toolCall.toolCallId,
                toolName: toolCall.toolName,
                input: toolCall.input,
                error: getErrorMessage(toolCall.error),
                dynamic: true,
                title: toolCall.title,
                ...toolCall.toolMetadata != null ? { toolMetadata: toolCall.toolMetadata } : {}
              });
              break;
            }
            const tool2 = tools == null ? void 0 : tools[toolCall.toolName];
            if (tool2 == null) {
              break;
            }
            if (tool2.onInputAvailable != null) {
              await tool2.onInputAvailable({
                input: toolCall.input,
                toolCallId: toolCall.toolCallId,
                messages,
                abortSignal,
                experimental_context
              });
            }
            if (await isApprovalNeeded({
              tool: tool2,
              toolCall,
              messages,
              experimental_context
            })) {
              toolResultsStreamController.enqueue({
                type: "tool-approval-request",
                approvalId: generateId2(),
                toolCall
              });
              break;
            }
            toolInputs.set(toolCall.toolCallId, toolCall.input);
            if (tool2.execute != null && toolCall.providerExecuted !== true) {
              const toolExecutionId = generateId2();
              outstandingToolResults.add(toolExecutionId);
              executeToolCall({
                toolCall,
                tools,
                tracer,
                telemetry,
                messages,
                abortSignal,
                experimental_context,
                stepNumber,
                model,
                onToolCallStart,
                onToolCallFinish,
                onPreliminaryToolResult: (result) => {
                  toolResultsStreamController.enqueue(result);
                }
              }).then((result) => {
                toolResultsStreamController.enqueue(result);
              }).catch((error) => {
                toolResultsStreamController.enqueue({
                  type: "error",
                  error
                });
              }).finally(() => {
                outstandingToolResults.delete(toolExecutionId);
                attemptClose();
              });
            }
          } catch (error) {
            toolResultsStreamController.enqueue({ type: "error", error });
          }
          break;
        }
        case "tool-result": {
          const toolName = chunk.toolName;
          const toolCall = toolCallsByToolCallId.get(chunk.toolCallId);
          if (chunk.isError) {
            toolResultsStreamController.enqueue({
              type: "tool-error",
              toolCallId: chunk.toolCallId,
              toolName,
              input: toolInputs.get(chunk.toolCallId),
              providerExecuted: true,
              error: chunk.result,
              dynamic: chunk.dynamic,
              ...chunk.providerMetadata != null ? { providerMetadata: chunk.providerMetadata } : {},
              ...(toolCall == null ? void 0 : toolCall.toolMetadata) != null ? { toolMetadata: toolCall.toolMetadata } : {}
            });
          } else {
            controller.enqueue({
              type: "tool-result",
              toolCallId: chunk.toolCallId,
              toolName,
              input: toolInputs.get(chunk.toolCallId),
              output: chunk.result,
              providerExecuted: true,
              dynamic: chunk.dynamic,
              ...chunk.providerMetadata != null ? { providerMetadata: chunk.providerMetadata } : {},
              ...(toolCall == null ? void 0 : toolCall.toolMetadata) != null ? { toolMetadata: toolCall.toolMetadata } : {}
            });
          }
          break;
        }
        default: {
          const _exhaustiveCheck = chunkType;
          throw new Error(`Unhandled chunk type: ${_exhaustiveCheck}`);
        }
      }
    },
    flush() {
      canClose = true;
      attemptClose();
    }
  });
  return new ReadableStream({
    async start(controller) {
      return Promise.all([
        generatorStream.pipeThrough(forwardStream).pipeTo(
          new WritableStream({
            write(chunk) {
              controller.enqueue(chunk);
            },
            close() {
            }
          })
        ),
        toolResultsStream.pipeTo(
          new WritableStream({
            write(chunk) {
              controller.enqueue(chunk);
            },
            close() {
              controller.close();
            }
          })
        )
      ]);
    }
  });
}
var originalGenerateId2 = createIdGenerator({
  prefix: "aitxt",
  size: 24
});
function streamText({
  model,
  tools,
  toolChoice,
  system,
  prompt,
  messages,
  allowSystemInMessages,
  maxRetries,
  abortSignal,
  timeout,
  headers,
  stopWhen = stepCountIs(1),
  experimental_output,
  output = experimental_output,
  experimental_telemetry: telemetry,
  prepareStep,
  providerOptions,
  experimental_activeTools,
  activeTools = experimental_activeTools,
  experimental_repairToolCall: repairToolCall,
  experimental_transform: transform2,
  experimental_download: download2,
  includeRawChunks = false,
  onChunk,
  onError = ({ error }) => {
    console.error(error);
  },
  onFinish,
  onAbort,
  onStepFinish,
  experimental_onStart: onStart,
  experimental_onStepStart: onStepStart,
  experimental_onToolCallStart: onToolCallStart,
  experimental_onToolCallFinish: onToolCallFinish,
  experimental_context,
  experimental_include: include,
  _internal: { now: now2 = now, generateId: generateId2 = originalGenerateId2 } = {},
  ...settings
}) {
  const totalTimeoutMs = getTotalTimeoutMs(timeout);
  const stepTimeoutMs = getStepTimeoutMs(timeout);
  const chunkTimeoutMs = getChunkTimeoutMs(timeout);
  const stepAbortController = stepTimeoutMs != null ? new AbortController() : void 0;
  const chunkAbortController = chunkTimeoutMs != null ? new AbortController() : void 0;
  return new DefaultStreamTextResult({
    model: resolveLanguageModel(model),
    telemetry,
    headers,
    settings,
    maxRetries,
    abortSignal: mergeAbortSignals(
      abortSignal,
      totalTimeoutMs != null ? AbortSignal.timeout(totalTimeoutMs) : void 0,
      stepAbortController == null ? void 0 : stepAbortController.signal,
      chunkAbortController == null ? void 0 : chunkAbortController.signal
    ),
    stepTimeoutMs,
    stepAbortController,
    chunkTimeoutMs,
    chunkAbortController,
    system,
    prompt,
    messages,
    allowSystemInMessages,
    tools,
    toolChoice,
    transforms: asArray(transform2),
    activeTools,
    repairToolCall,
    stopConditions: asArray(stopWhen),
    output,
    providerOptions,
    prepareStep,
    includeRawChunks,
    timeout,
    stopWhen,
    originalAbortSignal: abortSignal,
    onChunk,
    onError,
    onFinish,
    onAbort,
    onStepFinish,
    onStart,
    onStepStart,
    onToolCallStart,
    onToolCallFinish,
    now: now2,
    generateId: generateId2,
    experimental_context,
    download: download2,
    include
  });
}
function createOutputTransformStream(output) {
  let firstTextChunkId = void 0;
  let text2 = "";
  let textChunk = "";
  let textProviderMetadata = void 0;
  let lastPublishedValue = "";
  function publishTextChunk({
    controller,
    partialOutput = void 0
  }) {
    controller.enqueue({
      part: {
        type: "text-delta",
        id: firstTextChunkId,
        text: textChunk,
        providerMetadata: textProviderMetadata
      },
      partialOutput
    });
    textChunk = "";
  }
  return new TransformStream({
    async transform(chunk, controller) {
      var _a21;
      if (chunk.type === "finish-step" && textChunk.length > 0) {
        publishTextChunk({ controller });
      }
      if (chunk.type !== "text-delta" && chunk.type !== "text-start" && chunk.type !== "text-end") {
        controller.enqueue({ part: chunk, partialOutput: void 0 });
        return;
      }
      if (firstTextChunkId == null) {
        firstTextChunkId = chunk.id;
      } else if (chunk.id !== firstTextChunkId) {
        controller.enqueue({ part: chunk, partialOutput: void 0 });
        return;
      }
      if (chunk.type === "text-start") {
        controller.enqueue({ part: chunk, partialOutput: void 0 });
        return;
      }
      if (chunk.type === "text-end") {
        if (textChunk.length > 0) {
          publishTextChunk({ controller });
        }
        controller.enqueue({ part: chunk, partialOutput: void 0 });
        return;
      }
      text2 += chunk.text;
      textChunk += chunk.text;
      textProviderMetadata = (_a21 = chunk.providerMetadata) != null ? _a21 : textProviderMetadata;
      const result = await output.parsePartialOutput({ text: text2 });
      if (result !== void 0) {
        const currentValue = typeof result.partial === "string" ? result.partial : JSON.stringify(result.partial);
        if (currentValue !== lastPublishedValue) {
          publishTextChunk({ controller, partialOutput: result.partial });
          lastPublishedValue = currentValue;
        }
      }
    }
  });
}
var DefaultStreamTextResult = class {
  constructor({
    model,
    telemetry,
    headers,
    settings,
    maxRetries: maxRetriesArg,
    abortSignal,
    stepTimeoutMs,
    stepAbortController,
    chunkTimeoutMs,
    chunkAbortController,
    system,
    prompt,
    messages,
    allowSystemInMessages,
    tools,
    toolChoice,
    transforms,
    activeTools,
    repairToolCall,
    stopConditions,
    output,
    providerOptions,
    prepareStep,
    includeRawChunks,
    now: now2,
    generateId: generateId2,
    timeout,
    stopWhen,
    originalAbortSignal,
    onChunk,
    onError,
    onFinish,
    onAbort,
    onStepFinish,
    onStart,
    onStepStart,
    onToolCallStart,
    onToolCallFinish,
    experimental_context,
    download: download2,
    include
  }) {
    this._totalUsage = new DelayedPromise();
    this._finishReason = new DelayedPromise();
    this._rawFinishReason = new DelayedPromise();
    this._steps = new DelayedPromise();
    this.outputSpecification = output;
    this.includeRawChunks = includeRawChunks;
    this.tools = tools;
    const createGlobalTelemetry = getGlobalTelemetryIntegration();
    const globalTelemetry = createGlobalTelemetry(telemetry == null ? void 0 : telemetry.integrations);
    let stepFinish;
    let recordedContent = [];
    const recordedResponseMessages = [];
    let recordedFinishReason = void 0;
    let recordedRawFinishReason = void 0;
    let recordedTotalUsage = void 0;
    let recordedRequest = {};
    let recordedWarnings = [];
    const recordedSteps = [];
    const pendingDeferredToolCalls = /* @__PURE__ */ new Map();
    let rootSpan;
    let activeTextContent = {};
    let activeReasoningContent = {};
    const eventProcessor = new TransformStream({
      async transform(chunk, controller) {
        var _a21, _b9, _c, _d;
        controller.enqueue(chunk);
        const { part } = chunk;
        if (part.type === "text-delta" || part.type === "reasoning-delta" || part.type === "source" || part.type === "tool-call" || part.type === "tool-result" || part.type === "tool-input-start" || part.type === "tool-input-delta" || part.type === "raw") {
          await (onChunk == null ? void 0 : onChunk({ chunk: part }));
        }
        if (part.type === "error") {
          await onError({ error: wrapGatewayError(part.error) });
        }
        if (part.type === "text-start") {
          activeTextContent[part.id] = {
            type: "text",
            text: "",
            providerMetadata: part.providerMetadata
          };
          recordedContent.push(activeTextContent[part.id]);
        }
        if (part.type === "text-delta") {
          const activeText = activeTextContent[part.id];
          if (activeText == null) {
            controller.enqueue({
              part: {
                type: "error",
                error: `text part ${part.id} not found`
              },
              partialOutput: void 0
            });
            return;
          }
          activeText.text += part.text;
          activeText.providerMetadata = (_a21 = part.providerMetadata) != null ? _a21 : activeText.providerMetadata;
        }
        if (part.type === "text-end") {
          const activeText = activeTextContent[part.id];
          if (activeText == null) {
            controller.enqueue({
              part: {
                type: "error",
                error: `text part ${part.id} not found`
              },
              partialOutput: void 0
            });
            return;
          }
          activeText.providerMetadata = (_b9 = part.providerMetadata) != null ? _b9 : activeText.providerMetadata;
          delete activeTextContent[part.id];
        }
        if (part.type === "reasoning-start") {
          activeReasoningContent[part.id] = {
            type: "reasoning",
            text: "",
            providerMetadata: part.providerMetadata
          };
          recordedContent.push(activeReasoningContent[part.id]);
        }
        if (part.type === "reasoning-delta") {
          const activeReasoning = activeReasoningContent[part.id];
          if (activeReasoning == null) {
            controller.enqueue({
              part: {
                type: "error",
                error: `reasoning part ${part.id} not found`
              },
              partialOutput: void 0
            });
            return;
          }
          activeReasoning.text += part.text;
          activeReasoning.providerMetadata = (_c = part.providerMetadata) != null ? _c : activeReasoning.providerMetadata;
        }
        if (part.type === "reasoning-end") {
          const activeReasoning = activeReasoningContent[part.id];
          if (activeReasoning == null) {
            controller.enqueue({
              part: {
                type: "error",
                error: `reasoning part ${part.id} not found`
              },
              partialOutput: void 0
            });
            return;
          }
          activeReasoning.providerMetadata = (_d = part.providerMetadata) != null ? _d : activeReasoning.providerMetadata;
          delete activeReasoningContent[part.id];
        }
        if (part.type === "file") {
          recordedContent.push({
            type: "file",
            file: part.file,
            ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
          });
        }
        if (part.type === "source") {
          recordedContent.push(part);
        }
        if (part.type === "tool-call") {
          recordedContent.push(part);
        }
        if (part.type === "tool-result" && !part.preliminary) {
          recordedContent.push(part);
        }
        if (part.type === "tool-approval-request") {
          recordedContent.push(part);
        }
        if (part.type === "tool-error") {
          recordedContent.push(part);
        }
        if (part.type === "start-step") {
          recordedContent = [];
          activeReasoningContent = {};
          activeTextContent = {};
          recordedRequest = part.request;
          recordedWarnings = part.warnings;
        }
        if (part.type === "finish-step") {
          const stepMessages = await toResponseMessages({
            content: recordedContent,
            tools
          });
          const currentStepResult = new DefaultStepResult({
            stepNumber: recordedSteps.length,
            model: modelInfo,
            ...callbackTelemetryProps,
            experimental_context,
            content: recordedContent,
            finishReason: part.finishReason,
            rawFinishReason: part.rawFinishReason,
            usage: part.usage,
            warnings: recordedWarnings,
            request: recordedRequest,
            response: {
              ...part.response,
              messages: [...recordedResponseMessages, ...stepMessages]
            },
            providerMetadata: part.providerMetadata
          });
          await notify({
            event: currentStepResult,
            callbacks: [onStepFinish, globalTelemetry.onStepFinish]
          });
          logWarnings({
            warnings: recordedWarnings,
            provider: modelInfo.provider,
            model: modelInfo.modelId
          });
          recordedSteps.push(currentStepResult);
          recordedResponseMessages.push(...stepMessages);
          stepFinish.resolve();
        }
        if (part.type === "finish") {
          recordedTotalUsage = part.totalUsage;
          recordedFinishReason = part.finishReason;
          recordedRawFinishReason = part.rawFinishReason;
        }
      },
      async flush(controller) {
        var _a21, _b9, _c, _d, _e, _f, _g;
        try {
          if (recordedSteps.length === 0) {
            const error = (abortSignal == null ? void 0 : abortSignal.aborted) ? abortSignal.reason : new NoOutputGeneratedError({
              message: "No output generated. Check the stream for errors."
            });
            self2._finishReason.reject(error);
            self2._rawFinishReason.reject(error);
            self2._totalUsage.reject(error);
            self2._steps.reject(error);
            return;
          }
          const finishReason = recordedFinishReason != null ? recordedFinishReason : "other";
          const totalUsage = recordedTotalUsage != null ? recordedTotalUsage : createNullLanguageModelUsage();
          self2._finishReason.resolve(finishReason);
          self2._rawFinishReason.resolve(recordedRawFinishReason);
          self2._totalUsage.resolve(totalUsage);
          self2._steps.resolve(recordedSteps);
          const finalStep = recordedSteps[recordedSteps.length - 1];
          await notify({
            event: {
              stepNumber: finalStep.stepNumber,
              model: finalStep.model,
              functionId: finalStep.functionId,
              metadata: finalStep.metadata,
              experimental_context: finalStep.experimental_context,
              finishReason: finalStep.finishReason,
              rawFinishReason: finalStep.rawFinishReason,
              totalUsage,
              usage: finalStep.usage,
              content: finalStep.content,
              text: finalStep.text,
              reasoningText: finalStep.reasoningText,
              reasoning: finalStep.reasoning,
              files: finalStep.files,
              sources: finalStep.sources,
              toolCalls: finalStep.toolCalls,
              staticToolCalls: finalStep.staticToolCalls,
              dynamicToolCalls: finalStep.dynamicToolCalls,
              toolResults: finalStep.toolResults,
              staticToolResults: finalStep.staticToolResults,
              dynamicToolResults: finalStep.dynamicToolResults,
              request: finalStep.request,
              response: finalStep.response,
              warnings: finalStep.warnings,
              providerMetadata: finalStep.providerMetadata,
              steps: recordedSteps
            },
            callbacks: [
              onFinish,
              globalTelemetry.onFinish
            ]
          });
          rootSpan.setAttributes(
            await selectTelemetryAttributes({
              telemetry,
              attributes: {
                "ai.response.finishReason": finishReason,
                "ai.response.text": { output: () => finalStep.text },
                "ai.response.reasoning": {
                  output: () => finalStep.reasoningText
                },
                "ai.response.toolCalls": {
                  output: () => {
                    var _a22;
                    return ((_a22 = finalStep.toolCalls) == null ? void 0 : _a22.length) ? JSON.stringify(finalStep.toolCalls) : void 0;
                  }
                },
                "ai.response.providerMetadata": JSON.stringify(
                  finalStep.providerMetadata
                ),
                "ai.usage.inputTokens": totalUsage.inputTokens,
                "ai.usage.inputTokenDetails.noCacheTokens": (_a21 = totalUsage.inputTokenDetails) == null ? void 0 : _a21.noCacheTokens,
                "ai.usage.inputTokenDetails.cacheReadTokens": (_b9 = totalUsage.inputTokenDetails) == null ? void 0 : _b9.cacheReadTokens,
                "ai.usage.inputTokenDetails.cacheWriteTokens": (_c = totalUsage.inputTokenDetails) == null ? void 0 : _c.cacheWriteTokens,
                "ai.usage.outputTokens": totalUsage.outputTokens,
                "ai.usage.outputTokenDetails.textTokens": (_d = totalUsage.outputTokenDetails) == null ? void 0 : _d.textTokens,
                "ai.usage.outputTokenDetails.reasoningTokens": (_e = totalUsage.outputTokenDetails) == null ? void 0 : _e.reasoningTokens,
                "ai.usage.totalTokens": totalUsage.totalTokens,
                "ai.usage.reasoningTokens": (_f = totalUsage.outputTokenDetails) == null ? void 0 : _f.reasoningTokens,
                "ai.usage.cachedInputTokens": (_g = totalUsage.inputTokenDetails) == null ? void 0 : _g.cacheReadTokens
              }
            })
          );
        } catch (error) {
          controller.error(error);
        } finally {
          rootSpan.end();
        }
      }
    });
    const stitchableStream = createStitchableStream();
    this.addStream = stitchableStream.addStream;
    this.closeStream = stitchableStream.close;
    const reader = stitchableStream.stream.getReader();
    let stream = new ReadableStream({
      async start(controller) {
        controller.enqueue({ type: "start" });
      },
      async pull(controller) {
        function abort() {
          onAbort == null ? void 0 : onAbort({ steps: recordedSteps });
          controller.enqueue({
            type: "abort",
            // The `reason` is usually of type DOMException, but it can also be of any type,
            // so we use getErrorMessage for serialization because it is already designed to accept values of the unknown type.
            // See: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/reason
            ...(abortSignal == null ? void 0 : abortSignal.reason) !== void 0 ? { reason: getErrorMessage$1(abortSignal.reason) } : {}
          });
          controller.close();
        }
        try {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          if (abortSignal == null ? void 0 : abortSignal.aborted) {
            abort();
            return;
          }
          controller.enqueue(value);
        } catch (error) {
          if (isAbortError(error) && (abortSignal == null ? void 0 : abortSignal.aborted)) {
            abort();
          } else {
            controller.error(error);
          }
        }
      },
      cancel(reason) {
        return stitchableStream.stream.cancel(reason);
      }
    });
    for (const transform2 of transforms) {
      stream = stream.pipeThrough(
        transform2({
          tools,
          stopStream() {
            stitchableStream.terminate();
          }
        })
      );
    }
    this.baseStream = stream.pipeThrough(createOutputTransformStream(output != null ? output : text())).pipeThrough(eventProcessor);
    const { maxRetries, retry } = prepareRetries({
      maxRetries: maxRetriesArg,
      abortSignal
    });
    const tracer = getTracer(telemetry);
    const callSettings = prepareCallSettings(settings);
    const baseTelemetryAttributes = getBaseTelemetryAttributes({
      model,
      telemetry,
      headers,
      settings: { ...callSettings, maxRetries }
    });
    const self2 = this;
    const modelInfo = { provider: model.provider, modelId: model.modelId };
    const callbackTelemetryProps = {
      functionId: telemetry == null ? void 0 : telemetry.functionId,
      metadata: telemetry == null ? void 0 : telemetry.metadata
    };
    recordSpan({
      name: "ai.streamText",
      attributes: selectTelemetryAttributes({
        telemetry,
        attributes: {
          ...assembleOperationName({ operationId: "ai.streamText", telemetry }),
          ...baseTelemetryAttributes,
          // specific settings that only make sense on the outer level:
          "ai.prompt": {
            input: () => JSON.stringify({ system, prompt, messages })
          }
        }
      }),
      tracer,
      endWhenDone: false,
      fn: async (rootSpanArg) => {
        rootSpan = rootSpanArg;
        const initialPrompt = await standardizePrompt({
          system,
          prompt,
          messages,
          allowSystemInMessages
        });
        await notify({
          event: {
            model: modelInfo,
            system,
            prompt,
            messages,
            tools,
            toolChoice,
            activeTools,
            maxOutputTokens: callSettings.maxOutputTokens,
            temperature: callSettings.temperature,
            topP: callSettings.topP,
            topK: callSettings.topK,
            presencePenalty: callSettings.presencePenalty,
            frequencyPenalty: callSettings.frequencyPenalty,
            stopSequences: callSettings.stopSequences,
            seed: callSettings.seed,
            maxRetries,
            timeout,
            headers,
            providerOptions,
            stopWhen,
            output,
            abortSignal: originalAbortSignal,
            include,
            ...callbackTelemetryProps,
            experimental_context
          },
          callbacks: [
            onStart,
            globalTelemetry.onStart
          ]
        });
        const initialMessages = initialPrompt.messages;
        const initialResponseMessages = [];
        const { approvedToolApprovals, deniedToolApprovals } = collectToolApprovals({ messages: initialMessages });
        if (deniedToolApprovals.length > 0 || approvedToolApprovals.length > 0) {
          const localApprovedToolApprovals = approvedToolApprovals.filter(
            (toolApproval) => !toolApproval.toolCall.providerExecuted
          );
          const localDeniedToolApprovals = deniedToolApprovals.filter(
            (toolApproval) => !toolApproval.toolCall.providerExecuted
          );
          const deniedProviderExecutedToolApprovals = deniedToolApprovals.filter(
            (toolApproval) => toolApproval.toolCall.providerExecuted
          );
          let toolExecutionStepStreamController;
          const toolExecutionStepStream = new ReadableStream({
            start(controller) {
              toolExecutionStepStreamController = controller;
            }
          });
          self2.addStream(toolExecutionStepStream);
          try {
            for (const toolApproval of [
              ...localDeniedToolApprovals,
              ...deniedProviderExecutedToolApprovals
            ]) {
              toolExecutionStepStreamController == null ? void 0 : toolExecutionStepStreamController.enqueue({
                type: "tool-output-denied",
                toolCallId: toolApproval.toolCall.toolCallId,
                toolName: toolApproval.toolCall.toolName
              });
            }
            const toolOutputs = [];
            await Promise.all(
              localApprovedToolApprovals.map(async (toolApproval) => {
                const result = await executeToolCall({
                  toolCall: toolApproval.toolCall,
                  tools,
                  tracer,
                  telemetry,
                  messages: initialMessages,
                  abortSignal,
                  experimental_context,
                  stepNumber: recordedSteps.length,
                  model: modelInfo,
                  onToolCallStart: [
                    onToolCallStart,
                    globalTelemetry.onToolCallStart
                  ],
                  onToolCallFinish: [
                    onToolCallFinish,
                    globalTelemetry.onToolCallFinish
                  ],
                  onPreliminaryToolResult: (result2) => {
                    toolExecutionStepStreamController == null ? void 0 : toolExecutionStepStreamController.enqueue(result2);
                  }
                });
                if (result != null) {
                  toolExecutionStepStreamController == null ? void 0 : toolExecutionStepStreamController.enqueue(result);
                  toolOutputs.push(result);
                }
              })
            );
            if (toolOutputs.length > 0 || localDeniedToolApprovals.length > 0) {
              const localToolContent = [];
              for (const output2 of toolOutputs) {
                localToolContent.push({
                  type: "tool-result",
                  toolCallId: output2.toolCallId,
                  toolName: output2.toolName,
                  output: await createToolModelOutput({
                    toolCallId: output2.toolCallId,
                    input: output2.input,
                    tool: tools == null ? void 0 : tools[output2.toolName],
                    output: output2.type === "tool-result" ? output2.output : output2.error,
                    errorMode: output2.type === "tool-error" ? "text" : "none"
                  })
                });
              }
              for (const toolApproval of localDeniedToolApprovals) {
                localToolContent.push({
                  type: "tool-result",
                  toolCallId: toolApproval.toolCall.toolCallId,
                  toolName: toolApproval.toolCall.toolName,
                  output: {
                    type: "execution-denied",
                    reason: toolApproval.approvalResponse.reason
                  }
                });
              }
              initialResponseMessages.push({
                role: "tool",
                content: localToolContent
              });
            }
          } finally {
            toolExecutionStepStreamController == null ? void 0 : toolExecutionStepStreamController.close();
          }
        }
        recordedResponseMessages.push(...initialResponseMessages);
        async function streamStep({
          currentStep,
          responseMessages,
          usage
        }) {
          var _a21, _b9, _c, _d, _e, _f, _g, _h, _i;
          const includeRawChunks2 = self2.includeRawChunks;
          const stepTimeoutId = stepTimeoutMs != null ? setTimeout(() => stepAbortController.abort(), stepTimeoutMs) : void 0;
          let chunkTimeoutId = void 0;
          function resetChunkTimeout() {
            if (chunkTimeoutMs != null) {
              if (chunkTimeoutId != null) {
                clearTimeout(chunkTimeoutId);
              }
              chunkTimeoutId = setTimeout(
                () => chunkAbortController.abort(),
                chunkTimeoutMs
              );
            }
          }
          function clearChunkTimeout() {
            if (chunkTimeoutId != null) {
              clearTimeout(chunkTimeoutId);
              chunkTimeoutId = void 0;
            }
          }
          function clearStepTimeout() {
            if (stepTimeoutId != null) {
              clearTimeout(stepTimeoutId);
            }
          }
          try {
            stepFinish = new DelayedPromise();
            const stepInputMessages = [...initialMessages, ...responseMessages];
            const prepareStepResult = await (prepareStep == null ? void 0 : prepareStep({
              model,
              steps: recordedSteps,
              stepNumber: recordedSteps.length,
              messages: stepInputMessages,
              experimental_context
            }));
            const stepModel = resolveLanguageModel(
              (_a21 = prepareStepResult == null ? void 0 : prepareStepResult.model) != null ? _a21 : model
            );
            const stepModelInfo = {
              provider: stepModel.provider,
              modelId: stepModel.modelId
            };
            const promptMessages = await convertToLanguageModelPrompt({
              prompt: {
                system: (_b9 = prepareStepResult == null ? void 0 : prepareStepResult.system) != null ? _b9 : initialPrompt.system,
                messages: (_c = prepareStepResult == null ? void 0 : prepareStepResult.messages) != null ? _c : stepInputMessages
              },
              supportedUrls: await stepModel.supportedUrls,
              download: download2
            });
            const stepActiveTools = (_d = prepareStepResult == null ? void 0 : prepareStepResult.activeTools) != null ? _d : activeTools;
            const { toolChoice: stepToolChoice, tools: stepTools } = await prepareToolsAndToolChoice({
              tools,
              toolChoice: (_e = prepareStepResult == null ? void 0 : prepareStepResult.toolChoice) != null ? _e : toolChoice,
              activeTools: stepActiveTools
            });
            experimental_context = (_f = prepareStepResult == null ? void 0 : prepareStepResult.experimental_context) != null ? _f : experimental_context;
            const stepMessages = (_g = prepareStepResult == null ? void 0 : prepareStepResult.messages) != null ? _g : stepInputMessages;
            const stepSystem = (_h = prepareStepResult == null ? void 0 : prepareStepResult.system) != null ? _h : initialPrompt.system;
            const stepProviderOptions = mergeObjects(
              providerOptions,
              prepareStepResult == null ? void 0 : prepareStepResult.providerOptions
            );
            await notify({
              event: {
                stepNumber: recordedSteps.length,
                model: stepModelInfo,
                system: stepSystem,
                messages: stepMessages,
                tools,
                toolChoice: stepToolChoice,
                activeTools: stepActiveTools,
                steps: [...recordedSteps],
                providerOptions: stepProviderOptions,
                timeout,
                headers,
                stopWhen,
                output,
                abortSignal: originalAbortSignal,
                include,
                ...callbackTelemetryProps,
                experimental_context
              },
              callbacks: [
                onStepStart,
                globalTelemetry.onStepStart
              ]
            });
            const {
              result: { stream: stream2, response, request },
              doStreamSpan,
              startTimestampMs
            } = await retry(
              () => recordSpan({
                name: "ai.streamText.doStream",
                attributes: selectTelemetryAttributes({
                  telemetry,
                  attributes: {
                    ...assembleOperationName({
                      operationId: "ai.streamText.doStream",
                      telemetry
                    }),
                    ...baseTelemetryAttributes,
                    // model:
                    "ai.model.provider": stepModel.provider,
                    "ai.model.id": stepModel.modelId,
                    // prompt:
                    "ai.prompt.messages": {
                      input: () => stringifyForTelemetry(promptMessages)
                    },
                    "ai.prompt.tools": {
                      // convert the language model level tools:
                      input: () => stepTools == null ? void 0 : stepTools.map((tool2) => JSON.stringify(tool2))
                    },
                    "ai.prompt.toolChoice": {
                      input: () => stepToolChoice != null ? JSON.stringify(stepToolChoice) : void 0
                    },
                    // standardized gen-ai llm span attributes:
                    "gen_ai.system": stepModel.provider,
                    "gen_ai.request.model": stepModel.modelId,
                    "gen_ai.request.frequency_penalty": callSettings.frequencyPenalty,
                    "gen_ai.request.max_tokens": callSettings.maxOutputTokens,
                    "gen_ai.request.presence_penalty": callSettings.presencePenalty,
                    "gen_ai.request.stop_sequences": callSettings.stopSequences,
                    "gen_ai.request.temperature": callSettings.temperature,
                    "gen_ai.request.top_k": callSettings.topK,
                    "gen_ai.request.top_p": callSettings.topP
                  }
                }),
                tracer,
                endWhenDone: false,
                fn: async (doStreamSpan2) => ({
                  startTimestampMs: now2(),
                  // get before the call
                  doStreamSpan: doStreamSpan2,
                  result: await stepModel.doStream({
                    ...callSettings,
                    tools: stepTools,
                    toolChoice: stepToolChoice,
                    responseFormat: await (output == null ? void 0 : output.responseFormat),
                    prompt: promptMessages,
                    providerOptions: stepProviderOptions,
                    abortSignal,
                    headers,
                    includeRawChunks: includeRawChunks2
                  })
                })
              })
            );
            const streamWithToolResults = runToolsTransformation({
              tools,
              generatorStream: stream2,
              tracer,
              telemetry,
              system,
              messages: stepInputMessages,
              repairToolCall,
              abortSignal,
              experimental_context,
              generateId: generateId2,
              stepNumber: recordedSteps.length,
              model: stepModelInfo,
              onToolCallStart: [
                onToolCallStart,
                globalTelemetry.onToolCallStart
              ],
              onToolCallFinish: [
                onToolCallFinish,
                globalTelemetry.onToolCallFinish
              ]
            });
            const stepRequest = ((_i = include == null ? void 0 : include.requestBody) != null ? _i : true) ? request != null ? request : {} : { ...request, body: void 0 };
            const stepToolCalls = [];
            const stepToolOutputs = [];
            let warnings;
            const activeToolCallToolNames = {};
            let stepFinishReason = "other";
            let stepRawFinishReason = void 0;
            let stepUsage = createNullLanguageModelUsage();
            let stepProviderMetadata;
            let stepFirstChunk = true;
            let stepResponse = {
              id: generateId2(),
              timestamp: /* @__PURE__ */ new Date(),
              modelId: modelInfo.modelId
            };
            let activeText = "";
            self2.addStream(
              streamWithToolResults.pipeThrough(
                new TransformStream({
                  async transform(chunk, controller) {
                    var _a22, _b22, _c2, _d2, _e2;
                    resetChunkTimeout();
                    if (chunk.type === "stream-start") {
                      warnings = chunk.warnings;
                      return;
                    }
                    if (stepFirstChunk) {
                      const msToFirstChunk = now2() - startTimestampMs;
                      stepFirstChunk = false;
                      doStreamSpan.addEvent("ai.stream.firstChunk", {
                        "ai.response.msToFirstChunk": msToFirstChunk
                      });
                      doStreamSpan.setAttributes({
                        "ai.response.msToFirstChunk": msToFirstChunk
                      });
                      controller.enqueue({
                        type: "start-step",
                        request: stepRequest,
                        warnings: warnings != null ? warnings : []
                      });
                    }
                    const chunkType = chunk.type;
                    switch (chunkType) {
                      case "tool-approval-request":
                      case "text-start":
                      case "text-end": {
                        controller.enqueue(chunk);
                        break;
                      }
                      case "text-delta": {
                        if (chunk.delta.length > 0) {
                          controller.enqueue({
                            type: "text-delta",
                            id: chunk.id,
                            text: chunk.delta,
                            providerMetadata: chunk.providerMetadata
                          });
                          activeText += chunk.delta;
                        }
                        break;
                      }
                      case "reasoning-start":
                      case "reasoning-end": {
                        controller.enqueue(chunk);
                        break;
                      }
                      case "reasoning-delta": {
                        controller.enqueue({
                          type: "reasoning-delta",
                          id: chunk.id,
                          text: chunk.delta,
                          providerMetadata: chunk.providerMetadata
                        });
                        break;
                      }
                      case "tool-call": {
                        controller.enqueue(chunk);
                        stepToolCalls.push(chunk);
                        break;
                      }
                      case "tool-result": {
                        controller.enqueue(chunk);
                        if (!chunk.preliminary) {
                          stepToolOutputs.push(chunk);
                        }
                        break;
                      }
                      case "tool-error": {
                        controller.enqueue(chunk);
                        stepToolOutputs.push(chunk);
                        break;
                      }
                      case "response-metadata": {
                        stepResponse = {
                          id: (_a22 = chunk.id) != null ? _a22 : stepResponse.id,
                          timestamp: (_b22 = chunk.timestamp) != null ? _b22 : stepResponse.timestamp,
                          modelId: (_c2 = chunk.modelId) != null ? _c2 : stepResponse.modelId
                        };
                        break;
                      }
                      case "finish": {
                        stepUsage = chunk.usage;
                        stepFinishReason = chunk.finishReason;
                        stepRawFinishReason = chunk.rawFinishReason;
                        stepProviderMetadata = chunk.providerMetadata;
                        const msToFinish = now2() - startTimestampMs;
                        doStreamSpan.addEvent("ai.stream.finish");
                        doStreamSpan.setAttributes({
                          "ai.response.msToFinish": msToFinish,
                          "ai.response.avgOutputTokensPerSecond": 1e3 * ((_d2 = stepUsage.outputTokens) != null ? _d2 : 0) / msToFinish
                        });
                        break;
                      }
                      case "file": {
                        controller.enqueue(chunk);
                        break;
                      }
                      case "source": {
                        controller.enqueue(chunk);
                        break;
                      }
                      case "tool-input-start": {
                        activeToolCallToolNames[chunk.id] = chunk.toolName;
                        const tool2 = tools == null ? void 0 : tools[chunk.toolName];
                        if ((tool2 == null ? void 0 : tool2.onInputStart) != null) {
                          await tool2.onInputStart({
                            toolCallId: chunk.id,
                            messages: stepInputMessages,
                            abortSignal,
                            experimental_context
                          });
                        }
                        controller.enqueue({
                          ...chunk,
                          dynamic: (_e2 = chunk.dynamic) != null ? _e2 : (tool2 == null ? void 0 : tool2.type) === "dynamic",
                          title: tool2 == null ? void 0 : tool2.title
                        });
                        break;
                      }
                      case "tool-input-end": {
                        delete activeToolCallToolNames[chunk.id];
                        controller.enqueue(chunk);
                        break;
                      }
                      case "tool-input-delta": {
                        const toolName = activeToolCallToolNames[chunk.id];
                        const tool2 = tools == null ? void 0 : tools[toolName];
                        if ((tool2 == null ? void 0 : tool2.onInputDelta) != null) {
                          await tool2.onInputDelta({
                            inputTextDelta: chunk.delta,
                            toolCallId: chunk.id,
                            messages: stepInputMessages,
                            abortSignal,
                            experimental_context
                          });
                        }
                        controller.enqueue(chunk);
                        break;
                      }
                      case "error": {
                        controller.enqueue(chunk);
                        stepFinishReason = "error";
                        break;
                      }
                      case "raw": {
                        if (includeRawChunks2) {
                          controller.enqueue(chunk);
                        }
                        break;
                      }
                      default: {
                        const exhaustiveCheck = chunkType;
                        throw new Error(
                          `Unknown chunk type: ${exhaustiveCheck}`
                        );
                      }
                    }
                  },
                  // invoke onFinish callback and resolve toolResults promise when the stream is about to close:
                  async flush(controller) {
                    var _a22, _b22, _c2, _d2, _e2, _f2, _g2;
                    const stepToolCallsJson = stepToolCalls.length > 0 ? JSON.stringify(stepToolCalls) : void 0;
                    try {
                      doStreamSpan.setAttributes(
                        await selectTelemetryAttributes({
                          telemetry,
                          attributes: {
                            "ai.response.finishReason": stepFinishReason,
                            "ai.response.toolCalls": {
                              output: () => stepToolCallsJson
                            },
                            "ai.response.id": stepResponse.id,
                            "ai.response.model": stepResponse.modelId,
                            "ai.response.timestamp": stepResponse.timestamp.toISOString(),
                            "ai.usage.inputTokens": stepUsage.inputTokens,
                            "ai.usage.inputTokenDetails.noCacheTokens": (_a22 = stepUsage.inputTokenDetails) == null ? void 0 : _a22.noCacheTokens,
                            "ai.usage.inputTokenDetails.cacheReadTokens": (_b22 = stepUsage.inputTokenDetails) == null ? void 0 : _b22.cacheReadTokens,
                            "ai.usage.inputTokenDetails.cacheWriteTokens": (_c2 = stepUsage.inputTokenDetails) == null ? void 0 : _c2.cacheWriteTokens,
                            "ai.usage.outputTokens": stepUsage.outputTokens,
                            "ai.usage.outputTokenDetails.textTokens": (_d2 = stepUsage.outputTokenDetails) == null ? void 0 : _d2.textTokens,
                            "ai.usage.outputTokenDetails.reasoningTokens": (_e2 = stepUsage.outputTokenDetails) == null ? void 0 : _e2.reasoningTokens,
                            "ai.usage.totalTokens": stepUsage.totalTokens,
                            "ai.usage.reasoningTokens": (_f2 = stepUsage.outputTokenDetails) == null ? void 0 : _f2.reasoningTokens,
                            "ai.usage.cachedInputTokens": (_g2 = stepUsage.inputTokenDetails) == null ? void 0 : _g2.cacheReadTokens,
                            // standardized gen-ai llm span attributes:
                            "gen_ai.response.finish_reasons": [
                              stepFinishReason
                            ],
                            "gen_ai.response.id": stepResponse.id,
                            "gen_ai.response.model": stepResponse.modelId,
                            "gen_ai.usage.input_tokens": stepUsage.inputTokens,
                            "gen_ai.usage.output_tokens": stepUsage.outputTokens
                          }
                        })
                      );
                    } catch (error) {
                    }
                    controller.enqueue({
                      type: "finish-step",
                      finishReason: stepFinishReason,
                      rawFinishReason: stepRawFinishReason,
                      usage: stepUsage,
                      providerMetadata: stepProviderMetadata,
                      response: {
                        ...stepResponse,
                        headers: response == null ? void 0 : response.headers
                      }
                    });
                    const combinedUsage = addLanguageModelUsage(
                      usage,
                      stepUsage
                    );
                    await stepFinish.promise;
                    const processedStep = recordedSteps[recordedSteps.length - 1];
                    try {
                      doStreamSpan.setAttributes(
                        await selectTelemetryAttributes({
                          telemetry,
                          attributes: {
                            "ai.response.text": {
                              output: () => processedStep.text
                            },
                            "ai.response.reasoning": {
                              output: () => processedStep.reasoningText
                            },
                            "ai.response.providerMetadata": JSON.stringify(
                              processedStep.providerMetadata
                            )
                          }
                        })
                      );
                    } catch (error) {
                    } finally {
                      doStreamSpan.end();
                    }
                    const clientToolCalls = stepToolCalls.filter(
                      (toolCall) => toolCall.providerExecuted !== true
                    );
                    const clientToolOutputs = stepToolOutputs.filter(
                      (toolOutput) => toolOutput.providerExecuted !== true
                    );
                    for (const toolCall of stepToolCalls) {
                      if (toolCall.providerExecuted !== true)
                        continue;
                      const tool2 = tools == null ? void 0 : tools[toolCall.toolName];
                      if ((tool2 == null ? void 0 : tool2.type) === "provider" && tool2.supportsDeferredResults) {
                        const hasResultInStep = stepToolOutputs.some(
                          (output2) => (output2.type === "tool-result" || output2.type === "tool-error") && output2.toolCallId === toolCall.toolCallId
                        );
                        if (!hasResultInStep) {
                          pendingDeferredToolCalls.set(toolCall.toolCallId, {
                            toolName: toolCall.toolName
                          });
                        }
                      }
                    }
                    for (const output2 of stepToolOutputs) {
                      if (output2.type === "tool-result" || output2.type === "tool-error") {
                        pendingDeferredToolCalls.delete(output2.toolCallId);
                      }
                    }
                    clearStepTimeout();
                    clearChunkTimeout();
                    if (
                      // Continue if:
                      // 1. There are client tool calls that have all been executed, OR
                      // 2. There are pending deferred results from provider-executed tools
                      (clientToolCalls.length > 0 && clientToolOutputs.length === clientToolCalls.length || pendingDeferredToolCalls.size > 0) && // continue until a stop condition is met:
                      !await isStopConditionMet({
                        stopConditions,
                        steps: recordedSteps
                      })
                    ) {
                      responseMessages.push(
                        ...await toResponseMessages({
                          content: (
                            // use transformed content to create the messages for the next step:
                            recordedSteps[recordedSteps.length - 1].content
                          ),
                          tools
                        })
                      );
                      try {
                        await streamStep({
                          currentStep: currentStep + 1,
                          responseMessages,
                          usage: combinedUsage
                        });
                      } catch (error) {
                        controller.enqueue({
                          type: "error",
                          error
                        });
                        self2.closeStream();
                      }
                    } else {
                      controller.enqueue({
                        type: "finish",
                        finishReason: stepFinishReason,
                        rawFinishReason: stepRawFinishReason,
                        totalUsage: combinedUsage
                      });
                      self2.closeStream();
                    }
                  }
                })
              )
            );
          } finally {
            clearStepTimeout();
            clearChunkTimeout();
          }
        }
        await streamStep({
          currentStep: 0,
          responseMessages: initialResponseMessages,
          usage: createNullLanguageModelUsage()
        });
      }
    }).catch((error) => {
      self2.addStream(
        new ReadableStream({
          start(controller) {
            controller.enqueue({ type: "error", error });
            controller.close();
          }
        })
      );
      self2.closeStream();
    });
  }
  get steps() {
    this.consumeStream();
    return this._steps.promise;
  }
  get finalStep() {
    return this.steps.then((steps) => steps[steps.length - 1]);
  }
  get content() {
    return this.finalStep.then((step) => step.content);
  }
  get warnings() {
    return this.finalStep.then((step) => step.warnings);
  }
  get providerMetadata() {
    return this.finalStep.then((step) => step.providerMetadata);
  }
  get text() {
    return this.finalStep.then((step) => step.text);
  }
  get reasoningText() {
    return this.finalStep.then((step) => step.reasoningText);
  }
  get reasoning() {
    return this.finalStep.then((step) => step.reasoning);
  }
  get sources() {
    return this.finalStep.then((step) => step.sources);
  }
  get files() {
    return this.finalStep.then((step) => step.files);
  }
  get toolCalls() {
    return this.finalStep.then((step) => step.toolCalls);
  }
  get staticToolCalls() {
    return this.finalStep.then((step) => step.staticToolCalls);
  }
  get dynamicToolCalls() {
    return this.finalStep.then((step) => step.dynamicToolCalls);
  }
  get toolResults() {
    return this.finalStep.then((step) => step.toolResults);
  }
  get staticToolResults() {
    return this.finalStep.then((step) => step.staticToolResults);
  }
  get dynamicToolResults() {
    return this.finalStep.then((step) => step.dynamicToolResults);
  }
  get usage() {
    return this.finalStep.then((step) => step.usage);
  }
  get request() {
    return this.finalStep.then((step) => step.request);
  }
  get response() {
    return this.finalStep.then((step) => step.response);
  }
  get totalUsage() {
    this.consumeStream();
    return this._totalUsage.promise;
  }
  get finishReason() {
    this.consumeStream();
    return this._finishReason.promise;
  }
  get rawFinishReason() {
    this.consumeStream();
    return this._rawFinishReason.promise;
  }
  /**
   * Split out a new stream from the original stream.
   * The original stream is replaced to allow for further splitting,
   * since we do not know how many times the stream will be split.
   *
   * Note: this leads to buffering the stream content on the server.
   * However, the LLM results are expected to be small enough to not cause issues.
   */
  teeStream() {
    const [stream1, stream2] = this.baseStream.tee();
    this.baseStream = stream2;
    return stream1;
  }
  get textStream() {
    return createAsyncIterableStream(
      this.teeStream().pipeThrough(
        new TransformStream({
          transform({ part }, controller) {
            if (part.type === "text-delta") {
              controller.enqueue(part.text);
            }
          }
        })
      )
    );
  }
  get fullStream() {
    return createAsyncIterableStream(
      this.teeStream().pipeThrough(
        new TransformStream({
          transform({ part }, controller) {
            controller.enqueue(part);
          }
        })
      )
    );
  }
  async consumeStream(options) {
    var _a21;
    try {
      await consumeStream({
        stream: this.fullStream,
        onError: options == null ? void 0 : options.onError
      });
    } catch (error) {
      (_a21 = options == null ? void 0 : options.onError) == null ? void 0 : _a21.call(options, error);
    }
  }
  get experimental_partialOutputStream() {
    return this.partialOutputStream;
  }
  get partialOutputStream() {
    return createAsyncIterableStream(
      this.teeStream().pipeThrough(
        new TransformStream({
          transform({ partialOutput }, controller) {
            if (partialOutput != null) {
              controller.enqueue(partialOutput);
            }
          }
        })
      )
    );
  }
  get elementStream() {
    var _a21, _b9, _c;
    const transform2 = (_a21 = this.outputSpecification) == null ? void 0 : _a21.createElementStreamTransform();
    if (transform2 == null) {
      throw new UnsupportedFunctionalityError({
        functionality: `element streams in ${(_c = (_b9 = this.outputSpecification) == null ? void 0 : _b9.name) != null ? _c : "text"} mode`
      });
    }
    return createAsyncIterableStream(this.teeStream().pipeThrough(transform2));
  }
  get output() {
    return this.finalStep.then((step) => {
      var _a21;
      const output = (_a21 = this.outputSpecification) != null ? _a21 : text();
      return output.parseCompleteOutput(
        { text: step.text },
        {
          response: step.response,
          usage: step.usage,
          finishReason: step.finishReason
        }
      );
    });
  }
  toUIMessageStream({
    originalMessages,
    generateMessageId,
    onFinish,
    messageMetadata,
    sendReasoning = true,
    sendSources = false,
    sendStart = true,
    sendFinish = true,
    onError = getErrorMessage$1
  } = {}) {
    const responseMessageId = generateMessageId != null ? getResponseUIMessageId({
      originalMessages,
      responseMessageId: generateMessageId
    }) : void 0;
    const isDynamic = (part) => {
      var _a21;
      const tool2 = (_a21 = this.tools) == null ? void 0 : _a21[part.toolName];
      if (tool2 == null) {
        return part.dynamic;
      }
      return (tool2 == null ? void 0 : tool2.type) === "dynamic" ? true : void 0;
    };
    const baseStream = this.fullStream.pipeThrough(
      new TransformStream({
        transform: async (part, controller) => {
          const messageMetadataValue = messageMetadata == null ? void 0 : messageMetadata({ part });
          const partType = part.type;
          switch (partType) {
            case "text-start": {
              controller.enqueue({
                type: "text-start",
                id: part.id,
                ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
              });
              break;
            }
            case "text-delta": {
              controller.enqueue({
                type: "text-delta",
                id: part.id,
                delta: part.text,
                ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
              });
              break;
            }
            case "text-end": {
              controller.enqueue({
                type: "text-end",
                id: part.id,
                ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
              });
              break;
            }
            case "reasoning-start":
            case "reasoning-end": {
              if (sendReasoning) {
                controller.enqueue({
                  type: partType,
                  id: part.id,
                  ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
                });
              }
              break;
            }
            case "reasoning-delta": {
              if (sendReasoning) {
                controller.enqueue({
                  type: "reasoning-delta",
                  id: part.id,
                  delta: part.text,
                  ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
                });
              }
              break;
            }
            case "file": {
              controller.enqueue({
                type: "file",
                mediaType: part.file.mediaType,
                url: `data:${part.file.mediaType};base64,${part.file.base64}`,
                ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
              });
              break;
            }
            case "source": {
              if (sendSources && part.sourceType === "url") {
                controller.enqueue({
                  type: "source-url",
                  sourceId: part.id,
                  url: part.url,
                  title: part.title,
                  ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
                });
              }
              if (sendSources && part.sourceType === "document") {
                controller.enqueue({
                  type: "source-document",
                  sourceId: part.id,
                  mediaType: part.mediaType,
                  title: part.title,
                  filename: part.filename,
                  ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {}
                });
              }
              break;
            }
            case "tool-input-start": {
              const dynamic = isDynamic(part);
              controller.enqueue({
                type: "tool-input-start",
                toolCallId: part.id,
                toolName: part.toolName,
                ...part.providerExecuted != null ? { providerExecuted: part.providerExecuted } : {},
                ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
                ...part.toolMetadata != null ? { toolMetadata: part.toolMetadata } : {},
                ...dynamic != null ? { dynamic } : {},
                ...part.title != null ? { title: part.title } : {}
              });
              break;
            }
            case "tool-input-delta": {
              controller.enqueue({
                type: "tool-input-delta",
                toolCallId: part.id,
                inputTextDelta: part.delta
              });
              break;
            }
            case "tool-call": {
              const dynamic = isDynamic(part);
              if (part.invalid) {
                controller.enqueue({
                  type: "tool-input-error",
                  toolCallId: part.toolCallId,
                  toolName: part.toolName,
                  input: part.input,
                  ...part.providerExecuted != null ? { providerExecuted: part.providerExecuted } : {},
                  ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
                  ...part.toolMetadata != null ? { toolMetadata: part.toolMetadata } : {},
                  ...dynamic != null ? { dynamic } : {},
                  errorText: onError(part.error),
                  ...part.title != null ? { title: part.title } : {}
                });
              } else {
                controller.enqueue({
                  type: "tool-input-available",
                  toolCallId: part.toolCallId,
                  toolName: part.toolName,
                  input: part.input,
                  ...part.providerExecuted != null ? { providerExecuted: part.providerExecuted } : {},
                  ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
                  ...part.toolMetadata != null ? { toolMetadata: part.toolMetadata } : {},
                  ...dynamic != null ? { dynamic } : {},
                  ...part.title != null ? { title: part.title } : {}
                });
              }
              break;
            }
            case "tool-approval-request": {
              controller.enqueue({
                type: "tool-approval-request",
                approvalId: part.approvalId,
                toolCallId: part.toolCall.toolCallId
              });
              break;
            }
            case "tool-result": {
              const dynamic = isDynamic(part);
              controller.enqueue({
                type: "tool-output-available",
                toolCallId: part.toolCallId,
                output: part.output,
                ...part.providerExecuted != null ? { providerExecuted: part.providerExecuted } : {},
                ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
                ...part.toolMetadata != null ? { toolMetadata: part.toolMetadata } : {},
                ...part.preliminary != null ? { preliminary: part.preliminary } : {},
                ...dynamic != null ? { dynamic } : {}
              });
              break;
            }
            case "tool-error": {
              const dynamic = isDynamic(part);
              controller.enqueue({
                type: "tool-output-error",
                toolCallId: part.toolCallId,
                errorText: part.providerExecuted ? typeof part.error === "string" ? part.error : JSON.stringify(part.error) : onError(part.error),
                ...part.providerExecuted != null ? { providerExecuted: part.providerExecuted } : {},
                ...part.providerMetadata != null ? { providerMetadata: part.providerMetadata } : {},
                ...part.toolMetadata != null ? { toolMetadata: part.toolMetadata } : {},
                ...dynamic != null ? { dynamic } : {}
              });
              break;
            }
            case "tool-output-denied": {
              controller.enqueue({
                type: "tool-output-denied",
                toolCallId: part.toolCallId
              });
              break;
            }
            case "error": {
              controller.enqueue({
                type: "error",
                errorText: onError(part.error)
              });
              break;
            }
            case "start-step": {
              controller.enqueue({ type: "start-step" });
              break;
            }
            case "finish-step": {
              controller.enqueue({ type: "finish-step" });
              break;
            }
            case "start": {
              if (sendStart) {
                controller.enqueue({
                  type: "start",
                  ...messageMetadataValue != null ? { messageMetadata: messageMetadataValue } : {},
                  ...responseMessageId != null ? { messageId: responseMessageId } : {}
                });
              }
              break;
            }
            case "finish": {
              if (sendFinish) {
                controller.enqueue({
                  type: "finish",
                  finishReason: part.finishReason,
                  ...messageMetadataValue != null ? { messageMetadata: messageMetadataValue } : {}
                });
              }
              break;
            }
            case "abort": {
              controller.enqueue(part);
              break;
            }
            case "tool-input-end": {
              break;
            }
            case "raw": {
              break;
            }
            default: {
              const exhaustiveCheck = partType;
              throw new Error(`Unknown chunk type: ${exhaustiveCheck}`);
            }
          }
          if (messageMetadataValue != null && partType !== "start" && partType !== "finish") {
            controller.enqueue({
              type: "message-metadata",
              messageMetadata: messageMetadataValue
            });
          }
        }
      })
    );
    return createAsyncIterableStream(
      handleUIMessageStreamFinish({
        stream: baseStream,
        messageId: responseMessageId != null ? responseMessageId : generateMessageId == null ? void 0 : generateMessageId(),
        originalMessages,
        onFinish,
        onError
      })
    );
  }
  pipeUIMessageStreamToResponse(response, {
    originalMessages,
    generateMessageId,
    onFinish,
    messageMetadata,
    sendReasoning,
    sendSources,
    sendFinish,
    sendStart,
    onError,
    ...init
  } = {}) {
    pipeUIMessageStreamToResponse({
      response,
      stream: this.toUIMessageStream({
        originalMessages,
        generateMessageId,
        onFinish,
        messageMetadata,
        sendReasoning,
        sendSources,
        sendFinish,
        sendStart,
        onError
      }),
      ...init
    });
  }
  pipeTextStreamToResponse(response, init) {
    pipeTextStreamToResponse({
      response,
      textStream: this.textStream,
      ...init
    });
  }
  toUIMessageStreamResponse({
    originalMessages,
    generateMessageId,
    onFinish,
    messageMetadata,
    sendReasoning,
    sendSources,
    sendFinish,
    sendStart,
    onError,
    ...init
  } = {}) {
    return createUIMessageStreamResponse({
      stream: this.toUIMessageStream({
        originalMessages,
        generateMessageId,
        onFinish,
        messageMetadata,
        sendReasoning,
        sendSources,
        sendFinish,
        sendStart,
        onError
      }),
      ...init
    });
  }
  toTextStreamResponse(init) {
    return createTextStreamResponse({
      textStream: this.textStream,
      ...init
    });
  }
};
async function convertToModelMessages(messages, options) {
  const modelMessages = [];
  for (const message of messages) {
    switch (message.role) {
      case "system": {
        const textParts = message.parts.filter(
          (part) => part.type === "text"
        );
        const providerMetadata = textParts.reduce((acc, part) => {
          if (part.providerMetadata != null) {
            return { ...acc, ...part.providerMetadata };
          }
          return acc;
        }, {});
        modelMessages.push({
          role: "system",
          content: textParts.map((part) => part.text).join(""),
          ...Object.keys(providerMetadata).length > 0 ? { providerOptions: providerMetadata } : {}
        });
        break;
      }
      case "user": {
        modelMessages.push({
          role: "user",
          content: message.parts.map((part) => {
            var _a21;
            if (isTextUIPart(part)) {
              return {
                type: "text",
                text: part.text,
                ...part.providerMetadata != null ? { providerOptions: part.providerMetadata } : {}
              };
            }
            if (isFileUIPart(part)) {
              return {
                type: "file",
                mediaType: part.mediaType,
                filename: part.filename,
                data: part.url,
                ...part.providerMetadata != null ? { providerOptions: part.providerMetadata } : {}
              };
            }
            if (isDataUIPart(part)) {
              return (_a21 = void 0) == null ? void 0 : _a21.call(
                options,
                part
              );
            }
          }).filter(isNonNullable)
        });
        break;
      }
      case "assistant": {
        if (message.parts != null) {
          let block = [];
          async function processBlock() {
            var _a21, _b9, _c, _d, _e, _f, _g;
            if (block.length === 0) {
              return;
            }
            const content = [];
            for (const part of block) {
              if (isTextUIPart(part)) {
                content.push({
                  type: "text",
                  text: part.text,
                  ...part.providerMetadata != null ? { providerOptions: part.providerMetadata } : {}
                });
              } else if (isFileUIPart(part)) {
                content.push({
                  type: "file",
                  mediaType: part.mediaType,
                  filename: part.filename,
                  data: part.url,
                  ...part.providerMetadata != null ? { providerOptions: part.providerMetadata } : {}
                });
              } else if (isReasoningUIPart(part)) {
                content.push({
                  type: "reasoning",
                  text: part.text,
                  providerOptions: part.providerMetadata
                });
              } else if (isToolUIPart(part)) {
                const toolName = getToolName(part);
                if (part.state !== "input-streaming") {
                  content.push({
                    type: "tool-call",
                    toolCallId: part.toolCallId,
                    toolName,
                    input: part.state === "output-error" ? (_a21 = part.input) != null ? _a21 : "rawInput" in part ? part.rawInput : void 0 : part.input,
                    providerExecuted: part.providerExecuted,
                    ...part.callProviderMetadata != null ? { providerOptions: part.callProviderMetadata } : {}
                  });
                  if (part.approval != null) {
                    content.push({
                      type: "tool-approval-request",
                      approvalId: part.approval.id,
                      toolCallId: part.toolCallId
                    });
                  }
                  if (part.providerExecuted === true && part.state !== "approval-responded" && (part.state === "output-available" || part.state === "output-error")) {
                    const resultProviderMetadata = (_b9 = part.resultProviderMetadata) != null ? _b9 : part.callProviderMetadata;
                    content.push({
                      type: "tool-result",
                      toolCallId: part.toolCallId,
                      toolName,
                      output: await createToolModelOutput({
                        toolCallId: part.toolCallId,
                        input: part.input,
                        output: part.state === "output-error" ? part.errorText : part.output,
                        tool: (_c = void 0) == null ? void 0 : _c[toolName],
                        errorMode: part.state === "output-error" ? "json" : "none"
                      }),
                      ...resultProviderMetadata != null ? { providerOptions: resultProviderMetadata } : {}
                    });
                  }
                }
              } else if (isDataUIPart(part)) {
                const dataPart = (_d = void 0) == null ? void 0 : _d.call(
                  options,
                  part
                );
                if (dataPart != null) {
                  content.push(dataPart);
                }
              } else {
                const _exhaustiveCheck = part;
                throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
              }
            }
            modelMessages.push({
              role: "assistant",
              content
            });
            const toolParts = block.filter(
              (part) => {
                var _a22;
                return isToolUIPart(part) && (part.providerExecuted !== true || ((_a22 = part.approval) == null ? void 0 : _a22.approved) != null);
              }
            );
            if (toolParts.length > 0) {
              {
                const content2 = [];
                for (const toolPart of toolParts) {
                  if (((_e = toolPart.approval) == null ? void 0 : _e.approved) != null) {
                    content2.push({
                      type: "tool-approval-response",
                      approvalId: toolPart.approval.id,
                      approved: toolPart.approval.approved,
                      reason: toolPart.approval.reason,
                      providerExecuted: toolPart.providerExecuted
                    });
                  }
                  if (toolPart.providerExecuted === true) {
                    continue;
                  }
                  switch (toolPart.state) {
                    case "output-denied": {
                      content2.push({
                        type: "tool-result",
                        toolCallId: toolPart.toolCallId,
                        toolName: getToolName(toolPart),
                        output: {
                          type: "error-text",
                          value: (_f = toolPart.approval.reason) != null ? _f : "Tool execution denied."
                        },
                        ...toolPart.callProviderMetadata != null ? { providerOptions: toolPart.callProviderMetadata } : {}
                      });
                      break;
                    }
                    case "output-error":
                    case "output-available": {
                      const toolName = getToolName(toolPart);
                      content2.push({
                        type: "tool-result",
                        toolCallId: toolPart.toolCallId,
                        toolName,
                        output: await createToolModelOutput({
                          toolCallId: toolPart.toolCallId,
                          input: toolPart.input,
                          output: toolPart.state === "output-error" ? toolPart.errorText : toolPart.output,
                          tool: (_g = void 0) == null ? void 0 : _g[toolName],
                          errorMode: toolPart.state === "output-error" ? "text" : "none"
                        }),
                        ...toolPart.callProviderMetadata != null ? { providerOptions: toolPart.callProviderMetadata } : {}
                      });
                      break;
                    }
                  }
                }
                if (content2.length > 0) {
                  modelMessages.push({
                    role: "tool",
                    content: content2
                  });
                }
              }
            }
            block = [];
          }
          for (const part of message.parts) {
            if (isTextUIPart(part) || isReasoningUIPart(part) || isFileUIPart(part) || isToolUIPart(part) || isDataUIPart(part)) {
              block.push(part);
            } else if (part.type === "step-start") {
              await processBlock();
            }
          }
          await processBlock();
          break;
        }
        break;
      }
      default: {
        const _exhaustiveCheck = message.role;
        throw new MessageConversionError({
          originalMessage: message,
          message: `Unsupported role: ${_exhaustiveCheck}`
        });
      }
    }
  }
  return modelMessages;
}
record(
  string(),
  jsonValueSchema.optional()
);
createIdGenerator({ prefix: "aiobj", size: 24 });
var SerialJobExecutor = class {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }
  async processQueue() {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    while (this.queue.length > 0) {
      await this.queue[0]();
      this.queue.shift();
    }
    this.isProcessing = false;
  }
  async run(job) {
    return new Promise((resolve3, reject) => {
      this.queue.push(async () => {
        try {
          await job();
          resolve3();
        } catch (error) {
          reject(error);
        }
      });
      void this.processQueue();
    });
  }
};
createIdGenerator({ prefix: "aiobj", size: 24 });
async function convertFileListToFileUIParts(files) {
  if (files == null) {
    return [];
  }
  if (!globalThis.FileList || !(files instanceof globalThis.FileList)) {
    throw new Error("FileList is not supported in the current environment");
  }
  return Promise.all(
    Array.from(files).map(async (file) => {
      const { name: name21, type } = file;
      const dataUrl = await new Promise((resolve3, reject) => {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          var _a21;
          resolve3((_a21 = readerEvent.target) == null ? void 0 : _a21.result);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
      return {
        type: "file",
        mediaType: type,
        filename: name21,
        url: dataUrl
      };
    })
  );
}
var HttpChatTransport = class {
  constructor({
    api = "/api/chat",
    credentials,
    headers,
    body,
    fetch: fetch2,
    prepareSendMessagesRequest,
    prepareReconnectToStreamRequest
  }) {
    this.api = api;
    this.credentials = credentials;
    this.headers = headers;
    this.body = body;
    this.fetch = fetch2;
    this.prepareSendMessagesRequest = prepareSendMessagesRequest;
    this.prepareReconnectToStreamRequest = prepareReconnectToStreamRequest;
  }
  async sendMessages({
    abortSignal,
    ...options
  }) {
    var _a21, _b9, _c, _d, _e;
    const resolvedBody = await resolve(this.body);
    const resolvedHeaders = await resolve(this.headers);
    const resolvedCredentials = await resolve(this.credentials);
    const baseHeaders = {
      ...normalizeHeaders(resolvedHeaders),
      ...normalizeHeaders(options.headers)
    };
    const preparedRequest = await ((_a21 = this.prepareSendMessagesRequest) == null ? void 0 : _a21.call(this, {
      api: this.api,
      id: options.chatId,
      messages: options.messages,
      body: { ...resolvedBody, ...options.body },
      headers: baseHeaders,
      credentials: resolvedCredentials,
      requestMetadata: options.metadata,
      trigger: options.trigger,
      messageId: options.messageId
    }));
    const api = (_b9 = preparedRequest == null ? void 0 : preparedRequest.api) != null ? _b9 : this.api;
    const headers = (preparedRequest == null ? void 0 : preparedRequest.headers) !== void 0 ? normalizeHeaders(preparedRequest.headers) : baseHeaders;
    const body = (preparedRequest == null ? void 0 : preparedRequest.body) !== void 0 ? preparedRequest.body : {
      ...resolvedBody,
      ...options.body,
      id: options.chatId,
      messages: options.messages,
      trigger: options.trigger,
      messageId: options.messageId
    };
    const credentials = (_c = preparedRequest == null ? void 0 : preparedRequest.credentials) != null ? _c : resolvedCredentials;
    const fetch2 = (_d = this.fetch) != null ? _d : globalThis.fetch;
    const response = await fetch2(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify(body),
      credentials,
      signal: abortSignal
    });
    if (!response.ok) {
      throw new Error(
        (_e = await response.text()) != null ? _e : "Failed to fetch the chat response."
      );
    }
    if (!response.body) {
      throw new Error("The response body is empty.");
    }
    return this.processResponseStream(response.body);
  }
  async reconnectToStream(options) {
    var _a21, _b9, _c, _d, _e;
    const resolvedBody = await resolve(this.body);
    const resolvedHeaders = await resolve(this.headers);
    const resolvedCredentials = await resolve(this.credentials);
    const baseHeaders = {
      ...normalizeHeaders(resolvedHeaders),
      ...normalizeHeaders(options.headers)
    };
    const preparedRequest = await ((_a21 = this.prepareReconnectToStreamRequest) == null ? void 0 : _a21.call(this, {
      api: this.api,
      id: options.chatId,
      body: { ...resolvedBody, ...options.body },
      headers: baseHeaders,
      credentials: resolvedCredentials,
      requestMetadata: options.metadata
    }));
    const api = (_b9 = preparedRequest == null ? void 0 : preparedRequest.api) != null ? _b9 : `${this.api}/${options.chatId}/stream`;
    const headers = (preparedRequest == null ? void 0 : preparedRequest.headers) !== void 0 ? normalizeHeaders(preparedRequest.headers) : baseHeaders;
    const credentials = (_c = preparedRequest == null ? void 0 : preparedRequest.credentials) != null ? _c : resolvedCredentials;
    const fetch2 = (_d = this.fetch) != null ? _d : globalThis.fetch;
    const response = await fetch2(api, {
      method: "GET",
      headers,
      credentials
    });
    if (response.status === 204) {
      return null;
    }
    if (!response.ok) {
      throw new Error(
        (_e = await response.text()) != null ? _e : "Failed to fetch the chat response."
      );
    }
    if (!response.body) {
      throw new Error("The response body is empty.");
    }
    return this.processResponseStream(response.body);
  }
};
var DefaultChatTransport = class extends HttpChatTransport {
  constructor(options = {}) {
    super(options);
  }
  processResponseStream(stream) {
    return parseJsonEventStream({
      stream,
      schema: uiMessageChunkSchema
    }).pipeThrough(
      new TransformStream({
        async transform(chunk, controller) {
          if (!chunk.success) {
            throw chunk.error;
          }
          controller.enqueue(chunk.value);
        }
      })
    );
  }
};
var AbstractChat = class {
  constructor({
    generateId: generateId2 = generateId,
    id = generateId2(),
    transport = new DefaultChatTransport(),
    messageMetadataSchema,
    dataPartSchemas,
    state,
    onError,
    onToolCall,
    onFinish,
    onData,
    sendAutomaticallyWhen
  }) {
    this.activeResponse = void 0;
    this.jobExecutor = new SerialJobExecutor();
    this.sendMessage = async (message, options) => {
      var _a21, _b9, _c, _d;
      if (message == null) {
        await this.makeRequest({
          trigger: "submit-message",
          messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
          ...options
        });
        return;
      }
      let uiMessage;
      if ("text" in message || "files" in message) {
        const fileParts = Array.isArray(message.files) ? message.files : await convertFileListToFileUIParts(message.files);
        uiMessage = {
          parts: [
            ...fileParts,
            ..."text" in message && message.text != null ? [{ type: "text", text: message.text }] : []
          ]
        };
      } else {
        uiMessage = message;
      }
      if (message.messageId != null) {
        const messageIndex = this.state.messages.findIndex(
          (m) => m.id === message.messageId
        );
        if (messageIndex === -1) {
          throw new Error(`message with id ${message.messageId} not found`);
        }
        if (this.state.messages[messageIndex].role !== "user") {
          throw new Error(
            `message with id ${message.messageId} is not a user message`
          );
        }
        this.state.messages = this.state.messages.slice(0, messageIndex + 1);
        this.state.replaceMessage(messageIndex, {
          ...uiMessage,
          id: message.messageId,
          role: (_b9 = uiMessage.role) != null ? _b9 : "user",
          metadata: message.metadata
        });
      } else {
        this.state.pushMessage({
          ...uiMessage,
          id: (_c = uiMessage.id) != null ? _c : this.generateId(),
          role: (_d = uiMessage.role) != null ? _d : "user",
          metadata: message.metadata
        });
      }
      await this.makeRequest({
        trigger: "submit-message",
        messageId: message.messageId,
        ...options
      });
    };
    this.regenerate = async ({
      messageId,
      ...options
    } = {}) => {
      const messageIndex = messageId == null ? this.state.messages.length - 1 : this.state.messages.findIndex((message) => message.id === messageId);
      if (messageIndex === -1) {
        throw new Error(`message ${messageId} not found`);
      }
      this.state.messages = this.state.messages.slice(
        0,
        // if the message is a user message, we need to include it in the request:
        this.messages[messageIndex].role === "assistant" ? messageIndex : messageIndex + 1
      );
      await this.makeRequest({
        trigger: "regenerate-message",
        messageId,
        ...options
      });
    };
    this.resumeStream = async (options = {}) => {
      await this.makeRequest({ trigger: "resume-stream", ...options });
    };
    this.clearError = () => {
      if (this.status === "error") {
        this.state.error = void 0;
        this.setStatus({ status: "ready" });
      }
    };
    this.addToolApprovalResponse = async ({
      id: id2,
      approved,
      reason,
      options
    }) => this.jobExecutor.run(async () => {
      const messages = this.state.messages;
      const lastMessage = messages[messages.length - 1];
      const updatePart = (part) => isToolUIPart(part) && part.state === "approval-requested" && part.approval.id === id2 ? {
        ...part,
        state: "approval-responded",
        approval: { id: id2, approved, reason }
      } : part;
      this.state.replaceMessage(messages.length - 1, {
        ...lastMessage,
        parts: lastMessage.parts.map(updatePart)
      });
      if (this.activeResponse) {
        this.activeResponse.state.message.parts = this.activeResponse.state.message.parts.map(updatePart);
      }
      if (this.status !== "streaming" && this.status !== "submitted" && this.sendAutomaticallyWhen) {
        this.shouldSendAutomatically().then((shouldSend) => {
          var _a21;
          if (shouldSend) {
            this.makeRequest({
              trigger: "submit-message",
              messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
              ...options
            });
          }
        });
      }
    });
    this.addToolOutput = async ({
      state: state2 = "output-available",
      toolCallId,
      output,
      errorText,
      options
    }) => this.jobExecutor.run(async () => {
      const messages = this.state.messages;
      const lastMessage = messages[messages.length - 1];
      const updatePart = (part) => isToolUIPart(part) && part.toolCallId === toolCallId ? { ...part, state: state2, output, errorText } : part;
      this.state.replaceMessage(messages.length - 1, {
        ...lastMessage,
        parts: lastMessage.parts.map(updatePart)
      });
      if (this.activeResponse) {
        this.activeResponse.state.message.parts = this.activeResponse.state.message.parts.map(updatePart);
      }
      if (this.status !== "streaming" && this.status !== "submitted" && this.sendAutomaticallyWhen) {
        this.shouldSendAutomatically().then((shouldSend) => {
          var _a21;
          if (shouldSend) {
            this.makeRequest({
              trigger: "submit-message",
              messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
              ...options
            });
          }
        });
      }
    });
    this.addToolResult = this.addToolOutput;
    this.stop = async () => {
      var _a21;
      if (this.status !== "streaming" && this.status !== "submitted")
        return;
      if ((_a21 = this.activeResponse) == null ? void 0 : _a21.abortController) {
        this.activeResponse.abortController.abort();
      }
    };
    this.id = id;
    this.transport = transport;
    this.generateId = generateId2;
    this.messageMetadataSchema = messageMetadataSchema;
    this.dataPartSchemas = dataPartSchemas;
    this.state = state;
    this.onError = onError;
    this.onToolCall = onToolCall;
    this.onFinish = onFinish;
    this.onData = onData;
    this.sendAutomaticallyWhen = sendAutomaticallyWhen;
  }
  /**
   * Hook status:
   *
   * - `submitted`: The message has been sent to the API and we're awaiting the start of the response stream.
   * - `streaming`: The response is actively streaming in from the API, receiving chunks of data.
   * - `ready`: The full response has been received and processed; a new user message can be submitted.
   * - `error`: An error occurred during the API request, preventing successful completion.
   */
  get status() {
    return this.state.status;
  }
  setStatus({
    status,
    error
  }) {
    if (this.status === status)
      return;
    this.state.status = status;
    this.state.error = error;
  }
  get error() {
    return this.state.error;
  }
  get messages() {
    return this.state.messages;
  }
  get lastMessage() {
    return this.state.messages[this.state.messages.length - 1];
  }
  set messages(messages) {
    this.state.messages = messages;
  }
  async shouldSendAutomatically() {
    if (!this.sendAutomaticallyWhen)
      return false;
    const result = this.sendAutomaticallyWhen({
      messages: this.state.messages
    });
    if (result && typeof result === "object" && "then" in result) {
      return await result;
    }
    return result;
  }
  async makeRequest({
    trigger,
    metadata,
    headers,
    body,
    messageId
  }) {
    var _a21, _b9, _c;
    let resumeStream;
    if (trigger === "resume-stream") {
      try {
        const reconnect = await this.transport.reconnectToStream({
          chatId: this.id,
          metadata,
          headers,
          body
        });
        if (reconnect == null) {
          return;
        }
        resumeStream = reconnect;
      } catch (err) {
        if (this.onError && err instanceof Error) {
          this.onError(err);
        }
        this.setStatus({ status: "error", error: err });
        return;
      }
    }
    this.setStatus({ status: "submitted", error: void 0 });
    const lastMessage = this.lastMessage;
    let isAbort = false;
    let isDisconnect = false;
    let isError = false;
    try {
      const activeResponse = {
        state: createStreamingUIMessageState({
          lastMessage: this.state.snapshot(lastMessage),
          messageId: this.generateId()
        }),
        abortController: new AbortController()
      };
      activeResponse.abortController.signal.addEventListener("abort", () => {
        isAbort = true;
      });
      this.activeResponse = activeResponse;
      let stream;
      if (trigger === "resume-stream") {
        stream = resumeStream;
      } else {
        stream = await this.transport.sendMessages({
          chatId: this.id,
          messages: this.state.messages,
          abortSignal: activeResponse.abortController.signal,
          metadata,
          headers,
          body,
          trigger,
          messageId
        });
      }
      const runUpdateMessageJob = (job) => (
        // serialize the job execution to avoid race conditions:
        this.jobExecutor.run(
          () => job({
            state: activeResponse.state,
            write: () => {
              var _a22;
              this.setStatus({ status: "streaming" });
              const replaceLastMessage = activeResponse.state.message.id === ((_a22 = this.lastMessage) == null ? void 0 : _a22.id);
              if (replaceLastMessage) {
                this.state.replaceMessage(
                  this.state.messages.length - 1,
                  activeResponse.state.message
                );
              } else {
                this.state.pushMessage(activeResponse.state.message);
              }
            }
          })
        )
      );
      await consumeStream({
        stream: processUIMessageStream({
          stream,
          onToolCall: this.onToolCall,
          onData: this.onData,
          messageMetadataSchema: this.messageMetadataSchema,
          dataPartSchemas: this.dataPartSchemas,
          runUpdateMessageJob,
          onError: (error) => {
            throw error;
          }
        }),
        onError: (error) => {
          throw error;
        }
      });
      this.setStatus({ status: "ready" });
    } catch (err) {
      if (isAbort || err.name === "AbortError") {
        isAbort = true;
        this.setStatus({ status: "ready" });
        return null;
      }
      isError = true;
      if (err instanceof TypeError && (err.message.toLowerCase().includes("fetch") || err.message.toLowerCase().includes("network"))) {
        isDisconnect = true;
      }
      if (this.onError && err instanceof Error) {
        this.onError(err);
      }
      this.setStatus({ status: "error", error: err });
    } finally {
      try {
        (_b9 = this.onFinish) == null ? void 0 : _b9.call(this, {
          message: this.activeResponse.state.message,
          messages: this.state.messages,
          isAbort,
          isDisconnect,
          isError,
          finishReason: (_a21 = this.activeResponse) == null ? void 0 : _a21.state.finishReason
        });
      } catch (err) {
        console.error(err);
      }
      this.activeResponse = void 0;
    }
    if (!isError && await this.shouldSendAutomatically()) {
      await this.makeRequest({
        trigger: "submit-message",
        messageId: (_c = this.lastMessage) == null ? void 0 : _c.id,
        metadata,
        headers,
        body
      });
    }
  }
};
function toCamelCase(str) {
  return str.replace(/[_-]([a-z])/g, (g) => g[1].toUpperCase());
}
function resolveProviderOptionsKey(rawName, providerOptions) {
  const camelName = toCamelCase(rawName);
  if (camelName !== rawName && (providerOptions == null ? void 0 : providerOptions[camelName]) != null) {
    return camelName;
  }
  return rawName;
}
var openaiCompatibleErrorDataSchema = object$1({
  error: object$1({
    message: string(),
    // The additional information below is handled loosely to support
    // OpenAI-compatible providers that have slightly different error
    // responses:
    type: string().nullish(),
    param: any().nullish(),
    code: union([string(), number()]).nullish()
  })
});
var defaultOpenAICompatibleErrorStructure = {
  errorSchema: openaiCompatibleErrorDataSchema,
  errorToMessage: (data) => data.error.message
};
function convertOpenAICompatibleChatUsage(usage) {
  var _a10, _b9, _c, _d, _e, _f;
  if (usage == null) {
    return {
      inputTokens: {
        total: void 0,
        noCache: void 0,
        cacheRead: void 0,
        cacheWrite: void 0
      },
      outputTokens: {
        total: void 0,
        text: void 0,
        reasoning: void 0
      },
      raw: void 0
    };
  }
  const promptTokens = (_a10 = usage.prompt_tokens) != null ? _a10 : 0;
  const completionTokens = (_b9 = usage.completion_tokens) != null ? _b9 : 0;
  const cacheReadTokens = (_d = (_c = usage.prompt_tokens_details) == null ? void 0 : _c.cached_tokens) != null ? _d : 0;
  const reasoningTokens = (_f = (_e = usage.completion_tokens_details) == null ? void 0 : _e.reasoning_tokens) != null ? _f : 0;
  return {
    inputTokens: {
      total: promptTokens,
      noCache: promptTokens - cacheReadTokens,
      cacheRead: cacheReadTokens,
      cacheWrite: void 0
    },
    outputTokens: {
      total: completionTokens,
      text: completionTokens - reasoningTokens,
      reasoning: reasoningTokens
    },
    raw: usage
  };
}
function getOpenAIMetadata(message) {
  var _a10, _b9;
  return (_b9 = (_a10 = message == null ? void 0 : message.providerOptions) == null ? void 0 : _a10.openaiCompatible) != null ? _b9 : {};
}
function getAudioFormat(mediaType) {
  switch (mediaType) {
    case "audio/wav":
      return "wav";
    case "audio/mp3":
    case "audio/mpeg":
      return "mp3";
    default:
      return null;
  }
}
function convertToOpenAICompatibleChatMessages(prompt) {
  var _a10, _b9, _c;
  const messages = [];
  for (const { role, content, ...message } of prompt) {
    const metadata = getOpenAIMetadata({ ...message });
    switch (role) {
      case "system": {
        messages.push({ role: "system", content, ...metadata });
        break;
      }
      case "user": {
        if (content.length === 1 && content[0].type === "text") {
          messages.push({
            role: "user",
            content: content[0].text,
            ...getOpenAIMetadata(content[0])
          });
          break;
        }
        messages.push({
          role: "user",
          content: content.map((part) => {
            var _a22;
            const partMetadata = getOpenAIMetadata(part);
            switch (part.type) {
              case "text": {
                return { type: "text", text: part.text, ...partMetadata };
              }
              case "file": {
                if (part.mediaType.startsWith("image/")) {
                  const mediaType = part.mediaType === "image/*" ? "image/jpeg" : part.mediaType;
                  return {
                    type: "image_url",
                    image_url: {
                      url: part.data instanceof URL ? part.data.toString() : `data:${mediaType};base64,${convertToBase64(part.data)}`
                    },
                    ...partMetadata
                  };
                }
                if (part.mediaType.startsWith("audio/")) {
                  if (part.data instanceof URL) {
                    throw new UnsupportedFunctionalityError({
                      functionality: "audio file parts with URLs"
                    });
                  }
                  const format = getAudioFormat(part.mediaType);
                  if (format === null) {
                    throw new UnsupportedFunctionalityError({
                      functionality: `audio media type ${part.mediaType}`
                    });
                  }
                  return {
                    type: "input_audio",
                    input_audio: {
                      data: convertToBase64(part.data),
                      format
                    },
                    ...partMetadata
                  };
                }
                if (part.mediaType === "application/pdf") {
                  if (part.data instanceof URL) {
                    throw new UnsupportedFunctionalityError({
                      functionality: "PDF file parts with URLs"
                    });
                  }
                  return {
                    type: "file",
                    file: {
                      filename: (_a22 = part.filename) != null ? _a22 : "document.pdf",
                      file_data: `data:application/pdf;base64,${convertToBase64(part.data)}`
                    },
                    ...partMetadata
                  };
                }
                if (part.mediaType.startsWith("text/")) {
                  const textContent = part.data instanceof URL ? part.data.toString() : typeof part.data === "string" ? new TextDecoder().decode(
                    convertBase64ToUint8Array(part.data)
                  ) : new TextDecoder().decode(part.data);
                  return {
                    type: "text",
                    text: textContent,
                    ...partMetadata
                  };
                }
                throw new UnsupportedFunctionalityError({
                  functionality: `file part media type ${part.mediaType}`
                });
              }
            }
          }),
          ...metadata
        });
        break;
      }
      case "assistant": {
        let text2 = "";
        let reasoning = "";
        const toolCalls = [];
        for (const part of content) {
          const partMetadata = getOpenAIMetadata(part);
          switch (part.type) {
            case "text": {
              text2 += part.text;
              break;
            }
            case "reasoning": {
              reasoning += part.text;
              break;
            }
            case "tool-call": {
              const thoughtSignature = (_b9 = (_a10 = part.providerOptions) == null ? void 0 : _a10.google) == null ? void 0 : _b9.thoughtSignature;
              toolCalls.push({
                id: part.toolCallId,
                type: "function",
                function: {
                  name: part.toolName,
                  arguments: JSON.stringify(part.input)
                },
                ...partMetadata,
                // Include extra_content for Google Gemini thought signatures
                ...thoughtSignature ? {
                  extra_content: {
                    google: {
                      thought_signature: String(thoughtSignature)
                    }
                  }
                } : {}
              });
              break;
            }
          }
        }
        messages.push({
          role: "assistant",
          content: toolCalls.length > 0 ? text2 || null : text2,
          ...reasoning.length > 0 ? { reasoning_content: reasoning } : {},
          tool_calls: toolCalls.length > 0 ? toolCalls : void 0,
          ...metadata
        });
        break;
      }
      case "tool": {
        for (const toolResponse of content) {
          if (toolResponse.type === "tool-approval-response") {
            continue;
          }
          const output = toolResponse.output;
          let contentValue;
          switch (output.type) {
            case "text":
            case "error-text":
              contentValue = output.value;
              break;
            case "execution-denied":
              contentValue = (_c = output.reason) != null ? _c : "Tool execution denied.";
              break;
            case "content":
            case "json":
            case "error-json":
              contentValue = JSON.stringify(output.value);
              break;
          }
          const toolResponseMetadata = getOpenAIMetadata(toolResponse);
          messages.push({
            role: "tool",
            tool_call_id: toolResponse.toolCallId,
            content: contentValue,
            ...toolResponseMetadata
          });
        }
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  return messages;
}
function getResponseMetadata({
  id,
  model,
  created
}) {
  return {
    id: id != null ? id : void 0,
    modelId: model != null ? model : void 0,
    timestamp: created != null ? new Date(created * 1e3) : void 0
  };
}
function mapOpenAICompatibleFinishReason(finishReason) {
  switch (finishReason) {
    case "stop":
      return "stop";
    case "length":
      return "length";
    case "content_filter":
      return "content-filter";
    case "function_call":
    case "tool_calls":
      return "tool-calls";
    default:
      return "other";
  }
}
var openaiCompatibleLanguageModelChatOptions = object$1({
  /**
   * A unique identifier representing your end-user, which can help the provider to
   * monitor and detect abuse.
   */
  user: string().optional(),
  /**
   * Reasoning effort for reasoning models. Defaults to `medium`.
   */
  reasoningEffort: string().optional(),
  /**
   * Controls the verbosity of the generated text. Defaults to `medium`.
   */
  textVerbosity: string().optional(),
  /**
   * Whether to use strict JSON schema validation.
   * When true, the model uses constrained decoding to guarantee schema compliance.
   * Only used when the provider supports structured outputs and a schema is provided.
   *
   * @default true
   */
  strictJsonSchema: boolean().optional()
});
function prepareTools({
  tools,
  toolChoice
}) {
  tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
  const toolWarnings = [];
  if (tools == null) {
    return { tools: void 0, toolChoice: void 0, toolWarnings };
  }
  const openaiCompatTools = [];
  for (const tool2 of tools) {
    if (tool2.type === "provider") {
      toolWarnings.push({
        type: "unsupported",
        feature: `provider-defined tool ${tool2.id}`
      });
    } else {
      openaiCompatTools.push({
        type: "function",
        function: {
          name: tool2.name,
          description: tool2.description,
          parameters: tool2.inputSchema,
          ...tool2.strict != null ? { strict: tool2.strict } : {}
        }
      });
    }
  }
  if (toolChoice == null) {
    return { tools: openaiCompatTools, toolChoice: void 0, toolWarnings };
  }
  const type = toolChoice.type;
  switch (type) {
    case "auto":
    case "none":
    case "required":
      return { tools: openaiCompatTools, toolChoice: type, toolWarnings };
    case "tool":
      return {
        tools: openaiCompatTools,
        toolChoice: {
          type: "function",
          function: { name: toolChoice.toolName }
        },
        toolWarnings
      };
    default: {
      const _exhaustiveCheck = type;
      throw new UnsupportedFunctionalityError({
        functionality: `tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}
var OpenAICompatibleChatLanguageModel = class {
  // type inferred via constructor
  constructor(modelId, config2) {
    this.specificationVersion = "v3";
    var _a10, _b9;
    this.modelId = modelId;
    this.config = config2;
    const errorStructure = (_a10 = config2.errorStructure) != null ? _a10 : defaultOpenAICompatibleErrorStructure;
    this.chunkSchema = createOpenAICompatibleChatChunkSchema(
      errorStructure.errorSchema
    );
    this.failedResponseHandler = createJsonErrorResponseHandler(errorStructure);
    this.supportsStructuredOutputs = (_b9 = config2.supportsStructuredOutputs) != null ? _b9 : false;
  }
  get provider() {
    return this.config.provider;
  }
  get providerOptionsName() {
    return this.config.provider.split(".")[0].trim();
  }
  get supportedUrls() {
    var _a10, _b9, _c;
    return (_c = (_b9 = (_a10 = this.config).supportedUrls) == null ? void 0 : _b9.call(_a10)) != null ? _c : {};
  }
  transformRequestBody(args) {
    var _a10, _b9, _c;
    return (_c = (_b9 = (_a10 = this.config).transformRequestBody) == null ? void 0 : _b9.call(_a10, args)) != null ? _c : args;
  }
  convertUsage(usage) {
    var _a10, _b9, _c;
    return (_c = (_b9 = (_a10 = this.config).convertUsage) == null ? void 0 : _b9.call(_a10, usage)) != null ? _c : convertOpenAICompatibleChatUsage(usage);
  }
  async getArgs({
    prompt,
    maxOutputTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    providerOptions,
    stopSequences,
    responseFormat,
    seed,
    toolChoice,
    tools
  }) {
    var _a10, _b9, _c, _d, _e;
    const warnings = [];
    const deprecatedOptions = await parseProviderOptions({
      provider: "openai-compatible",
      providerOptions,
      schema: openaiCompatibleLanguageModelChatOptions
    });
    if (deprecatedOptions != null) {
      warnings.push({
        type: "other",
        message: `The 'openai-compatible' key in providerOptions is deprecated. Use 'openaiCompatible' instead.`
      });
    }
    const compatibleOptions = Object.assign(
      deprecatedOptions != null ? deprecatedOptions : {},
      (_a10 = await parseProviderOptions({
        provider: "openaiCompatible",
        providerOptions,
        schema: openaiCompatibleLanguageModelChatOptions
      })) != null ? _a10 : {},
      (_b9 = await parseProviderOptions({
        provider: this.providerOptionsName,
        providerOptions,
        schema: openaiCompatibleLanguageModelChatOptions
      })) != null ? _b9 : {},
      (_c = await parseProviderOptions({
        provider: toCamelCase(this.providerOptionsName),
        providerOptions,
        schema: openaiCompatibleLanguageModelChatOptions
      })) != null ? _c : {}
    );
    const strictJsonSchema = (_d = compatibleOptions == null ? void 0 : compatibleOptions.strictJsonSchema) != null ? _d : true;
    if (topK != null) {
      warnings.push({ type: "unsupported", feature: "topK" });
    }
    if ((responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && !this.supportsStructuredOutputs) {
      warnings.push({
        type: "unsupported",
        feature: "responseFormat",
        details: "JSON response format schema is only supported with structuredOutputs"
      });
    }
    const {
      tools: openaiTools,
      toolChoice: openaiToolChoice,
      toolWarnings
    } = prepareTools({
      tools,
      toolChoice
    });
    const metadataKey = resolveProviderOptionsKey(
      this.providerOptionsName,
      providerOptions
    );
    return {
      metadataKey,
      args: {
        // model id:
        model: this.modelId,
        // model specific settings:
        user: compatibleOptions.user,
        // standardized settings:
        max_tokens: maxOutputTokens,
        temperature,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
        response_format: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? this.supportsStructuredOutputs === true && responseFormat.schema != null ? {
          type: "json_schema",
          json_schema: {
            schema: responseFormat.schema,
            strict: strictJsonSchema,
            name: (_e = responseFormat.name) != null ? _e : "response",
            description: responseFormat.description
          }
        } : { type: "json_object" } : void 0,
        stop: stopSequences,
        seed,
        ...Object.fromEntries(
          Object.entries({
            ...providerOptions == null ? void 0 : providerOptions[this.providerOptionsName],
            ...providerOptions == null ? void 0 : providerOptions[toCamelCase(this.providerOptionsName)]
          }).filter(
            ([key]) => !Object.keys(
              openaiCompatibleLanguageModelChatOptions.shape
            ).includes(key)
          )
        ),
        reasoning_effort: compatibleOptions.reasoningEffort,
        verbosity: compatibleOptions.textVerbosity,
        // messages:
        messages: convertToOpenAICompatibleChatMessages(prompt),
        // tools:
        tools: openaiTools,
        tool_choice: openaiToolChoice
      },
      warnings: [...warnings, ...toolWarnings]
    };
  }
  async doGenerate(options) {
    var _a10, _b9, _c, _d, _e, _f, _g, _h;
    const { args, warnings, metadataKey } = await this.getArgs({ ...options });
    const transformedBody = this.transformRequestBody(args);
    const body = JSON.stringify(transformedBody);
    const {
      responseHeaders,
      value: responseBody,
      rawValue: rawResponse
    } = await postJsonToApi({
      url: this.config.url({
        path: "/chat/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options.headers),
      body: transformedBody,
      failedResponseHandler: this.failedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        OpenAICompatibleChatResponseSchema
      ),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });
    const choice2 = responseBody.choices[0];
    const content = [];
    const text2 = choice2.message.content;
    if (text2 != null && text2.length > 0) {
      content.push({ type: "text", text: text2 });
    }
    const reasoning = (_a10 = choice2.message.reasoning_content) != null ? _a10 : choice2.message.reasoning;
    if (reasoning != null && reasoning.length > 0) {
      content.push({
        type: "reasoning",
        text: reasoning
      });
    }
    if (choice2.message.tool_calls != null) {
      for (const toolCall of choice2.message.tool_calls) {
        const thoughtSignature = (_c = (_b9 = toolCall.extra_content) == null ? void 0 : _b9.google) == null ? void 0 : _c.thought_signature;
        content.push({
          type: "tool-call",
          toolCallId: (_d = toolCall.id) != null ? _d : generateId(),
          toolName: toolCall.function.name,
          input: toolCall.function.arguments,
          ...thoughtSignature ? {
            providerMetadata: {
              [metadataKey]: { thoughtSignature }
            }
          } : {}
        });
      }
    }
    const providerMetadata = {
      [metadataKey]: {},
      ...await ((_f = (_e = this.config.metadataExtractor) == null ? void 0 : _e.extractMetadata) == null ? void 0 : _f.call(_e, {
        parsedBody: rawResponse
      }))
    };
    const completionTokenDetails = (_g = responseBody.usage) == null ? void 0 : _g.completion_tokens_details;
    if ((completionTokenDetails == null ? void 0 : completionTokenDetails.accepted_prediction_tokens) != null) {
      providerMetadata[metadataKey].acceptedPredictionTokens = completionTokenDetails == null ? void 0 : completionTokenDetails.accepted_prediction_tokens;
    }
    if ((completionTokenDetails == null ? void 0 : completionTokenDetails.rejected_prediction_tokens) != null) {
      providerMetadata[metadataKey].rejectedPredictionTokens = completionTokenDetails == null ? void 0 : completionTokenDetails.rejected_prediction_tokens;
    }
    return {
      content,
      finishReason: {
        unified: mapOpenAICompatibleFinishReason(choice2.finish_reason),
        raw: (_h = choice2.finish_reason) != null ? _h : void 0
      },
      usage: this.convertUsage(responseBody.usage),
      providerMetadata,
      request: { body },
      response: {
        ...getResponseMetadata(responseBody),
        headers: responseHeaders,
        body: rawResponse
      },
      warnings
    };
  }
  async doStream(options) {
    var _a10;
    const { args, warnings, metadataKey } = await this.getArgs({ ...options });
    const body = this.transformRequestBody({
      ...args,
      stream: true,
      // only include stream_options when in strict compatibility mode:
      stream_options: this.config.includeUsage ? { include_usage: true } : void 0
    });
    const metadataExtractor = (_a10 = this.config.metadataExtractor) == null ? void 0 : _a10.createStreamExtractor();
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/chat/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options.headers),
      body,
      failedResponseHandler: this.failedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(
        this.chunkSchema
      ),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });
    const toolCalls = [];
    let finishReason = {
      unified: "other",
      raw: void 0
    };
    let usage = void 0;
    let isFirstChunk = true;
    const providerOptionsName = metadataKey;
    let isActiveReasoning = false;
    let isActiveText = false;
    const convertUsage = (usage2) => this.convertUsage(usage2);
    return {
      stream: response.pipeThrough(
        new TransformStream({
          start(controller) {
            controller.enqueue({ type: "stream-start", warnings });
          },
          transform(chunk, controller) {
            var _a22, _b9, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
            if (options.includeRawChunks) {
              controller.enqueue({ type: "raw", rawValue: chunk.rawValue });
            }
            if (!chunk.success) {
              finishReason = { unified: "error", raw: void 0 };
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            metadataExtractor == null ? void 0 : metadataExtractor.processChunk(chunk.rawValue);
            if ("error" in chunk.value) {
              finishReason = { unified: "error", raw: void 0 };
              controller.enqueue({
                type: "error",
                error: chunk.value.error.message
              });
              return;
            }
            const value = chunk.value;
            if (isFirstChunk) {
              isFirstChunk = false;
              controller.enqueue({
                type: "response-metadata",
                ...getResponseMetadata(value)
              });
            }
            if (value.usage != null) {
              usage = value.usage;
            }
            const choice2 = value.choices[0];
            if ((choice2 == null ? void 0 : choice2.finish_reason) != null) {
              finishReason = {
                unified: mapOpenAICompatibleFinishReason(choice2.finish_reason),
                raw: (_a22 = choice2.finish_reason) != null ? _a22 : void 0
              };
            }
            if ((choice2 == null ? void 0 : choice2.delta) == null) {
              return;
            }
            const delta = choice2.delta;
            const reasoningContent = (_b9 = delta.reasoning_content) != null ? _b9 : delta.reasoning;
            if (reasoningContent) {
              if (!isActiveReasoning) {
                controller.enqueue({
                  type: "reasoning-start",
                  id: "reasoning-0"
                });
                isActiveReasoning = true;
              }
              controller.enqueue({
                type: "reasoning-delta",
                id: "reasoning-0",
                delta: reasoningContent
              });
            }
            if (delta.content) {
              if (isActiveReasoning) {
                controller.enqueue({
                  type: "reasoning-end",
                  id: "reasoning-0"
                });
                isActiveReasoning = false;
              }
              if (!isActiveText) {
                controller.enqueue({ type: "text-start", id: "txt-0" });
                isActiveText = true;
              }
              controller.enqueue({
                type: "text-delta",
                id: "txt-0",
                delta: delta.content
              });
            }
            if (delta.tool_calls != null) {
              if (isActiveReasoning) {
                controller.enqueue({
                  type: "reasoning-end",
                  id: "reasoning-0"
                });
                isActiveReasoning = false;
              }
              for (const toolCallDelta of delta.tool_calls) {
                const index = (_c = toolCallDelta.index) != null ? _c : toolCalls.length;
                if (toolCalls[index] == null) {
                  if (toolCallDelta.id == null) {
                    throw new InvalidResponseDataError({
                      data: toolCallDelta,
                      message: `Expected 'id' to be a string.`
                    });
                  }
                  if (((_d = toolCallDelta.function) == null ? void 0 : _d.name) == null) {
                    throw new InvalidResponseDataError({
                      data: toolCallDelta,
                      message: `Expected 'function.name' to be a string.`
                    });
                  }
                  controller.enqueue({
                    type: "tool-input-start",
                    id: toolCallDelta.id,
                    toolName: toolCallDelta.function.name
                  });
                  toolCalls[index] = {
                    id: toolCallDelta.id,
                    type: "function",
                    function: {
                      name: toolCallDelta.function.name,
                      arguments: (_e = toolCallDelta.function.arguments) != null ? _e : ""
                    },
                    hasFinished: false,
                    thoughtSignature: (_h = (_g = (_f = toolCallDelta.extra_content) == null ? void 0 : _f.google) == null ? void 0 : _g.thought_signature) != null ? _h : void 0
                  };
                  const toolCall2 = toolCalls[index];
                  if (((_i = toolCall2.function) == null ? void 0 : _i.name) != null && ((_j = toolCall2.function) == null ? void 0 : _j.arguments) != null) {
                    if (toolCall2.function.arguments.length > 0) {
                      controller.enqueue({
                        type: "tool-input-delta",
                        id: toolCall2.id,
                        delta: toolCall2.function.arguments
                      });
                    }
                    if (isParsableJson(toolCall2.function.arguments)) {
                      controller.enqueue({
                        type: "tool-input-end",
                        id: toolCall2.id
                      });
                      controller.enqueue({
                        type: "tool-call",
                        toolCallId: (_k = toolCall2.id) != null ? _k : generateId(),
                        toolName: toolCall2.function.name,
                        input: toolCall2.function.arguments,
                        ...toolCall2.thoughtSignature ? {
                          providerMetadata: {
                            [providerOptionsName]: {
                              thoughtSignature: toolCall2.thoughtSignature
                            }
                          }
                        } : {}
                      });
                      toolCall2.hasFinished = true;
                    }
                  }
                  continue;
                }
                const toolCall = toolCalls[index];
                if (toolCall.hasFinished) {
                  continue;
                }
                if (((_l = toolCallDelta.function) == null ? void 0 : _l.arguments) != null) {
                  toolCall.function.arguments += (_n = (_m = toolCallDelta.function) == null ? void 0 : _m.arguments) != null ? _n : "";
                }
                controller.enqueue({
                  type: "tool-input-delta",
                  id: toolCall.id,
                  delta: (_o = toolCallDelta.function.arguments) != null ? _o : ""
                });
                if (((_p = toolCall.function) == null ? void 0 : _p.name) != null && ((_q = toolCall.function) == null ? void 0 : _q.arguments) != null && isParsableJson(toolCall.function.arguments)) {
                  controller.enqueue({
                    type: "tool-input-end",
                    id: toolCall.id
                  });
                  controller.enqueue({
                    type: "tool-call",
                    toolCallId: (_r = toolCall.id) != null ? _r : generateId(),
                    toolName: toolCall.function.name,
                    input: toolCall.function.arguments,
                    ...toolCall.thoughtSignature ? {
                      providerMetadata: {
                        [providerOptionsName]: {
                          thoughtSignature: toolCall.thoughtSignature
                        }
                      }
                    } : {}
                  });
                  toolCall.hasFinished = true;
                }
              }
            }
          },
          flush(controller) {
            var _a22, _b9, _c, _d, _e;
            if (isActiveReasoning) {
              controller.enqueue({ type: "reasoning-end", id: "reasoning-0" });
            }
            if (isActiveText) {
              controller.enqueue({ type: "text-end", id: "txt-0" });
            }
            for (const toolCall of toolCalls.filter(
              (toolCall2) => !toolCall2.hasFinished
            )) {
              controller.enqueue({
                type: "tool-input-end",
                id: toolCall.id
              });
              controller.enqueue({
                type: "tool-call",
                toolCallId: (_a22 = toolCall.id) != null ? _a22 : generateId(),
                toolName: toolCall.function.name,
                input: toolCall.function.arguments,
                ...toolCall.thoughtSignature ? {
                  providerMetadata: {
                    [providerOptionsName]: {
                      thoughtSignature: toolCall.thoughtSignature
                    }
                  }
                } : {}
              });
            }
            const providerMetadata = {
              [providerOptionsName]: {},
              ...metadataExtractor == null ? void 0 : metadataExtractor.buildMetadata()
            };
            if (((_b9 = usage == null ? void 0 : usage.completion_tokens_details) == null ? void 0 : _b9.accepted_prediction_tokens) != null) {
              providerMetadata[providerOptionsName].acceptedPredictionTokens = (_c = usage == null ? void 0 : usage.completion_tokens_details) == null ? void 0 : _c.accepted_prediction_tokens;
            }
            if (((_d = usage == null ? void 0 : usage.completion_tokens_details) == null ? void 0 : _d.rejected_prediction_tokens) != null) {
              providerMetadata[providerOptionsName].rejectedPredictionTokens = (_e = usage == null ? void 0 : usage.completion_tokens_details) == null ? void 0 : _e.rejected_prediction_tokens;
            }
            controller.enqueue({
              type: "finish",
              finishReason,
              usage: convertUsage(usage),
              providerMetadata
            });
          }
        })
      ),
      request: { body },
      response: { headers: responseHeaders }
    };
  }
};
var openaiCompatibleTokenUsageSchema = looseObject({
  prompt_tokens: number().nullish(),
  completion_tokens: number().nullish(),
  total_tokens: number().nullish(),
  prompt_tokens_details: object$1({
    cached_tokens: number().nullish()
  }).nullish(),
  completion_tokens_details: object$1({
    reasoning_tokens: number().nullish(),
    accepted_prediction_tokens: number().nullish(),
    rejected_prediction_tokens: number().nullish()
  }).nullish()
}).nullish();
var OpenAICompatibleChatResponseSchema = looseObject({
  id: string().nullish(),
  created: number().nullish(),
  model: string().nullish(),
  choices: array$1(
    object$1({
      message: object$1({
        role: literal("assistant").nullish(),
        content: string().nullish(),
        reasoning_content: string().nullish(),
        reasoning: string().nullish(),
        tool_calls: array$1(
          object$1({
            id: string().nullish(),
            function: object$1({
              name: string(),
              arguments: string()
            }),
            // Support for Google Gemini thought signatures via OpenAI compatibility
            extra_content: object$1({
              google: object$1({
                thought_signature: string().nullish()
              }).nullish()
            }).nullish()
          })
        ).nullish()
      }),
      finish_reason: string().nullish()
    })
  ),
  usage: openaiCompatibleTokenUsageSchema
});
var chunkBaseSchema = looseObject({
  id: string().nullish(),
  created: number().nullish(),
  model: string().nullish(),
  choices: array$1(
    object$1({
      delta: object$1({
        role: _enum(["assistant"]).nullish(),
        content: string().nullish(),
        // Most openai-compatible models set `reasoning_content`, but some
        // providers serving `gpt-oss` set `reasoning`. See #7866
        reasoning_content: string().nullish(),
        reasoning: string().nullish(),
        tool_calls: array$1(
          object$1({
            index: number().nullish(),
            //google does not send index
            id: string().nullish(),
            function: object$1({
              name: string().nullish(),
              arguments: string().nullish()
            }),
            // Support for Google Gemini thought signatures via OpenAI compatibility
            extra_content: object$1({
              google: object$1({
                thought_signature: string().nullish()
              }).nullish()
            }).nullish()
          })
        ).nullish()
      }).nullish(),
      finish_reason: string().nullish()
    })
  ),
  usage: openaiCompatibleTokenUsageSchema
});
var createOpenAICompatibleChatChunkSchema = (errorSchema) => union([chunkBaseSchema, errorSchema]);
function convertOpenAICompatibleCompletionUsage(usage) {
  var _a10, _b9;
  if (usage == null) {
    return {
      inputTokens: {
        total: void 0,
        noCache: void 0,
        cacheRead: void 0,
        cacheWrite: void 0
      },
      outputTokens: {
        total: void 0,
        text: void 0,
        reasoning: void 0
      },
      raw: void 0
    };
  }
  const promptTokens = (_a10 = usage.prompt_tokens) != null ? _a10 : 0;
  const completionTokens = (_b9 = usage.completion_tokens) != null ? _b9 : 0;
  return {
    inputTokens: {
      total: promptTokens,
      noCache: promptTokens,
      cacheRead: void 0,
      cacheWrite: void 0
    },
    outputTokens: {
      total: completionTokens,
      text: completionTokens,
      reasoning: void 0
    },
    raw: usage
  };
}
function convertToOpenAICompatibleCompletionPrompt({
  prompt,
  user = "user",
  assistant = "assistant"
}) {
  let text2 = "";
  if (prompt[0].role === "system") {
    text2 += `${prompt[0].content}

`;
    prompt = prompt.slice(1);
  }
  for (const { role, content } of prompt) {
    switch (role) {
      case "system": {
        throw new InvalidPromptError({
          message: "Unexpected system message in prompt: ${content}",
          prompt
        });
      }
      case "user": {
        const userMessage = content.map((part) => {
          switch (part.type) {
            case "text": {
              return part.text;
            }
          }
        }).filter(Boolean).join("");
        text2 += `${user}:
${userMessage}

`;
        break;
      }
      case "assistant": {
        const assistantMessage = content.map((part) => {
          switch (part.type) {
            case "text": {
              return part.text;
            }
            case "tool-call": {
              throw new UnsupportedFunctionalityError({
                functionality: "tool-call messages"
              });
            }
          }
        }).join("");
        text2 += `${assistant}:
${assistantMessage}

`;
        break;
      }
      case "tool": {
        throw new UnsupportedFunctionalityError({
          functionality: "tool messages"
        });
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  text2 += `${assistant}:
`;
  return {
    prompt: text2,
    stopSequences: [`
${user}:`]
  };
}
function getResponseMetadata2({
  id,
  model,
  created
}) {
  return {
    id: id != null ? id : void 0,
    modelId: model != null ? model : void 0,
    timestamp: created != null ? new Date(created * 1e3) : void 0
  };
}
function mapOpenAICompatibleFinishReason2(finishReason) {
  switch (finishReason) {
    case "stop":
      return "stop";
    case "length":
      return "length";
    case "content_filter":
      return "content-filter";
    case "function_call":
    case "tool_calls":
      return "tool-calls";
    default:
      return "other";
  }
}
var openaiCompatibleLanguageModelCompletionOptions = object$1({
  /**
   * Echo back the prompt in addition to the completion.
   */
  echo: boolean().optional(),
  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   *
   * Accepts a JSON object that maps tokens (specified by their token ID in
   * the GPT tokenizer) to an associated bias value from -100 to 100.
   */
  logitBias: record(string(), number()).optional(),
  /**
   * The suffix that comes after a completion of inserted text.
   */
  suffix: string().optional(),
  /**
   * A unique identifier representing your end-user, which can help providers to
   * monitor and detect abuse.
   */
  user: string().optional()
});
var OpenAICompatibleCompletionLanguageModel = class {
  // type inferred via constructor
  constructor(modelId, config2) {
    this.specificationVersion = "v3";
    var _a10;
    this.modelId = modelId;
    this.config = config2;
    const errorStructure = (_a10 = config2.errorStructure) != null ? _a10 : defaultOpenAICompatibleErrorStructure;
    this.chunkSchema = createOpenAICompatibleCompletionChunkSchema(
      errorStructure.errorSchema
    );
    this.failedResponseHandler = createJsonErrorResponseHandler(errorStructure);
  }
  get provider() {
    return this.config.provider;
  }
  get providerOptionsName() {
    return this.config.provider.split(".")[0].trim();
  }
  get supportedUrls() {
    var _a10, _b9, _c;
    return (_c = (_b9 = (_a10 = this.config).supportedUrls) == null ? void 0 : _b9.call(_a10)) != null ? _c : {};
  }
  async getArgs({
    prompt,
    maxOutputTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences: userStopSequences,
    responseFormat,
    seed,
    providerOptions,
    tools,
    toolChoice
  }) {
    var _a10, _b9;
    const warnings = [];
    const completionOptions = Object.assign(
      (_a10 = await parseProviderOptions({
        provider: this.providerOptionsName,
        providerOptions,
        schema: openaiCompatibleLanguageModelCompletionOptions
      })) != null ? _a10 : {},
      (_b9 = await parseProviderOptions({
        provider: toCamelCase(this.providerOptionsName),
        providerOptions,
        schema: openaiCompatibleLanguageModelCompletionOptions
      })) != null ? _b9 : {}
    );
    if (topK != null) {
      warnings.push({ type: "unsupported", feature: "topK" });
    }
    if (tools == null ? void 0 : tools.length) {
      warnings.push({ type: "unsupported", feature: "tools" });
    }
    if (toolChoice != null) {
      warnings.push({ type: "unsupported", feature: "toolChoice" });
    }
    if (responseFormat != null && responseFormat.type !== "text") {
      warnings.push({
        type: "unsupported",
        feature: "responseFormat",
        details: "JSON response format is not supported."
      });
    }
    const { prompt: completionPrompt, stopSequences } = convertToOpenAICompatibleCompletionPrompt({ prompt });
    const stop = [...stopSequences != null ? stopSequences : [], ...userStopSequences != null ? userStopSequences : []];
    return {
      args: {
        // model id:
        model: this.modelId,
        // model specific settings:
        echo: completionOptions.echo,
        logit_bias: completionOptions.logitBias,
        suffix: completionOptions.suffix,
        user: completionOptions.user,
        // standardized settings:
        max_tokens: maxOutputTokens,
        temperature,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
        seed,
        ...providerOptions == null ? void 0 : providerOptions[this.providerOptionsName],
        ...providerOptions == null ? void 0 : providerOptions[toCamelCase(this.providerOptionsName)],
        // prompt:
        prompt: completionPrompt,
        // stop sequences:
        stop: stop.length > 0 ? stop : void 0
      },
      warnings
    };
  }
  async doGenerate(options) {
    const { args, warnings } = await this.getArgs(options);
    const {
      responseHeaders,
      value: response,
      rawValue: rawResponse
    } = await postJsonToApi({
      url: this.config.url({
        path: "/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options.headers),
      body: args,
      failedResponseHandler: this.failedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        openaiCompatibleCompletionResponseSchema
      ),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });
    const choice2 = response.choices[0];
    const content = [];
    if (choice2.text != null && choice2.text.length > 0) {
      content.push({ type: "text", text: choice2.text });
    }
    return {
      content,
      usage: convertOpenAICompatibleCompletionUsage(response.usage),
      finishReason: {
        unified: mapOpenAICompatibleFinishReason2(choice2.finish_reason),
        raw: choice2.finish_reason
      },
      request: { body: args },
      response: {
        ...getResponseMetadata2(response),
        headers: responseHeaders,
        body: rawResponse
      },
      warnings
    };
  }
  async doStream(options) {
    const { args, warnings } = await this.getArgs(options);
    const body = {
      ...args,
      stream: true,
      // only include stream_options when in strict compatibility mode:
      stream_options: this.config.includeUsage ? { include_usage: true } : void 0
    };
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options.headers),
      body,
      failedResponseHandler: this.failedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(
        this.chunkSchema
      ),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });
    let finishReason = {
      unified: "other",
      raw: void 0
    };
    let usage = void 0;
    let isFirstChunk = true;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          start(controller) {
            controller.enqueue({ type: "stream-start", warnings });
          },
          transform(chunk, controller) {
            var _a10;
            if (options.includeRawChunks) {
              controller.enqueue({ type: "raw", rawValue: chunk.rawValue });
            }
            if (!chunk.success) {
              finishReason = { unified: "error", raw: void 0 };
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            if ("error" in value) {
              finishReason = { unified: "error", raw: void 0 };
              controller.enqueue({ type: "error", error: value.error });
              return;
            }
            if (isFirstChunk) {
              isFirstChunk = false;
              controller.enqueue({
                type: "response-metadata",
                ...getResponseMetadata2(value)
              });
              controller.enqueue({
                type: "text-start",
                id: "0"
              });
            }
            if (value.usage != null) {
              usage = value.usage;
            }
            const choice2 = value.choices[0];
            if ((choice2 == null ? void 0 : choice2.finish_reason) != null) {
              finishReason = {
                unified: mapOpenAICompatibleFinishReason2(choice2.finish_reason),
                raw: (_a10 = choice2.finish_reason) != null ? _a10 : void 0
              };
            }
            if ((choice2 == null ? void 0 : choice2.text) != null) {
              controller.enqueue({
                type: "text-delta",
                id: "0",
                delta: choice2.text
              });
            }
          },
          flush(controller) {
            if (!isFirstChunk) {
              controller.enqueue({ type: "text-end", id: "0" });
            }
            controller.enqueue({
              type: "finish",
              finishReason,
              usage: convertOpenAICompatibleCompletionUsage(usage)
            });
          }
        })
      ),
      request: { body },
      response: { headers: responseHeaders }
    };
  }
};
var usageSchema = object$1({
  prompt_tokens: number(),
  completion_tokens: number(),
  total_tokens: number()
});
var openaiCompatibleCompletionResponseSchema = object$1({
  id: string().nullish(),
  created: number().nullish(),
  model: string().nullish(),
  choices: array$1(
    object$1({
      text: string(),
      finish_reason: string()
    })
  ),
  usage: usageSchema.nullish()
});
var createOpenAICompatibleCompletionChunkSchema = (errorSchema) => union([
  object$1({
    id: string().nullish(),
    created: number().nullish(),
    model: string().nullish(),
    choices: array$1(
      object$1({
        text: string(),
        finish_reason: string().nullish(),
        index: number()
      })
    ),
    usage: usageSchema.nullish()
  }),
  errorSchema
]);
var openaiCompatibleEmbeddingModelOptions = object$1({
  /**
   * The number of dimensions the resulting output embeddings should have.
   * Only supported in text-embedding-3 and later models.
   */
  dimensions: number().optional(),
  /**
   * A unique identifier representing your end-user, which can help providers to
   * monitor and detect abuse.
   */
  user: string().optional()
});
var OpenAICompatibleEmbeddingModel = class {
  constructor(modelId, config2) {
    this.specificationVersion = "v3";
    this.modelId = modelId;
    this.config = config2;
  }
  get provider() {
    return this.config.provider;
  }
  get maxEmbeddingsPerCall() {
    var _a10;
    return (_a10 = this.config.maxEmbeddingsPerCall) != null ? _a10 : 2048;
  }
  get supportsParallelCalls() {
    var _a10;
    return (_a10 = this.config.supportsParallelCalls) != null ? _a10 : true;
  }
  get providerOptionsName() {
    return this.config.provider.split(".")[0].trim();
  }
  async doEmbed({
    values,
    headers,
    abortSignal,
    providerOptions
  }) {
    var _a10, _b9, _c;
    const warnings = [];
    const deprecatedOptions = await parseProviderOptions({
      provider: "openai-compatible",
      providerOptions,
      schema: openaiCompatibleEmbeddingModelOptions
    });
    if (deprecatedOptions != null) {
      warnings.push({
        type: "other",
        message: `The 'openai-compatible' key in providerOptions is deprecated. Use 'openaiCompatible' instead.`
      });
    }
    const compatibleOptions = Object.assign(
      deprecatedOptions != null ? deprecatedOptions : {},
      (_a10 = await parseProviderOptions({
        provider: "openaiCompatible",
        providerOptions,
        schema: openaiCompatibleEmbeddingModelOptions
      })) != null ? _a10 : {},
      (_b9 = await parseProviderOptions({
        provider: this.providerOptionsName,
        providerOptions,
        schema: openaiCompatibleEmbeddingModelOptions
      })) != null ? _b9 : {}
    );
    if (values.length > this.maxEmbeddingsPerCall) {
      throw new TooManyEmbeddingValuesForCallError({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values
      });
    }
    const {
      responseHeaders,
      value: response,
      rawValue
    } = await postJsonToApi({
      url: this.config.url({
        path: "/embeddings",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), headers),
      body: {
        model: this.modelId,
        input: values,
        encoding_format: "float",
        dimensions: compatibleOptions.dimensions,
        user: compatibleOptions.user
      },
      failedResponseHandler: createJsonErrorResponseHandler(
        (_c = this.config.errorStructure) != null ? _c : defaultOpenAICompatibleErrorStructure
      ),
      successfulResponseHandler: createJsonResponseHandler(
        openaiTextEmbeddingResponseSchema
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      warnings,
      embeddings: response.data.map((item) => item.embedding),
      usage: response.usage ? { tokens: response.usage.prompt_tokens } : void 0,
      providerMetadata: response.providerMetadata,
      response: { headers: responseHeaders, body: rawValue }
    };
  }
};
var openaiTextEmbeddingResponseSchema = object$1({
  data: array$1(object$1({ embedding: array$1(number()) })),
  usage: object$1({ prompt_tokens: number() }).nullish(),
  providerMetadata: record(string(), record(string(), any())).optional()
});
var OpenAICompatibleImageModel = class {
  constructor(modelId, config2) {
    this.modelId = modelId;
    this.config = config2;
    this.specificationVersion = "v3";
    this.maxImagesPerCall = 10;
  }
  get provider() {
    return this.config.provider;
  }
  /**
   * The provider options key used to extract provider-specific options.
   */
  get providerOptionsKey() {
    return this.config.provider.split(".")[0].trim();
  }
  // TODO: deprecate non-camelCase keys and remove in future major version
  getArgs(providerOptions) {
    return {
      ...providerOptions[this.providerOptionsKey],
      ...providerOptions[toCamelCase(this.providerOptionsKey)]
    };
  }
  async doGenerate({
    prompt,
    n,
    size,
    aspectRatio,
    seed,
    providerOptions,
    headers,
    abortSignal,
    files,
    mask
  }) {
    var _a10, _b9, _c, _d, _e;
    const warnings = [];
    if (aspectRatio != null) {
      warnings.push({
        type: "unsupported",
        feature: "aspectRatio",
        details: "This model does not support aspect ratio. Use `size` instead."
      });
    }
    if (seed != null) {
      warnings.push({ type: "unsupported", feature: "seed" });
    }
    const currentDate = (_c = (_b9 = (_a10 = this.config._internal) == null ? void 0 : _a10.currentDate) == null ? void 0 : _b9.call(_a10)) != null ? _c : /* @__PURE__ */ new Date();
    const args = this.getArgs(providerOptions);
    if (files != null && files.length > 0) {
      const { value: response2, responseHeaders: responseHeaders2 } = await postFormDataToApi({
        url: this.config.url({
          path: "/images/edits",
          modelId: this.modelId
        }),
        headers: combineHeaders(this.config.headers(), headers),
        formData: convertToFormData({
          model: this.modelId,
          prompt,
          image: await Promise.all(files.map((file) => fileToBlob(file))),
          mask: mask != null ? await fileToBlob(mask) : void 0,
          n,
          size,
          ...args
        }),
        failedResponseHandler: createJsonErrorResponseHandler(
          (_d = this.config.errorStructure) != null ? _d : defaultOpenAICompatibleErrorStructure
        ),
        successfulResponseHandler: createJsonResponseHandler(
          openaiCompatibleImageResponseSchema
        ),
        abortSignal,
        fetch: this.config.fetch
      });
      return {
        images: response2.data.map((item) => item.b64_json),
        warnings,
        response: {
          timestamp: currentDate,
          modelId: this.modelId,
          headers: responseHeaders2
        }
      };
    }
    const { value: response, responseHeaders } = await postJsonToApi({
      url: this.config.url({
        path: "/images/generations",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), headers),
      body: {
        model: this.modelId,
        prompt,
        n,
        size,
        ...args,
        response_format: "b64_json"
      },
      failedResponseHandler: createJsonErrorResponseHandler(
        (_e = this.config.errorStructure) != null ? _e : defaultOpenAICompatibleErrorStructure
      ),
      successfulResponseHandler: createJsonResponseHandler(
        openaiCompatibleImageResponseSchema
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      images: response.data.map((item) => item.b64_json),
      warnings,
      response: {
        timestamp: currentDate,
        modelId: this.modelId,
        headers: responseHeaders
      }
    };
  }
};
var openaiCompatibleImageResponseSchema = object$1({
  data: array$1(object$1({ b64_json: string() }))
});
async function fileToBlob(file) {
  if (file.type === "url") {
    return downloadBlob(file.url);
  }
  const data = file.data instanceof Uint8Array ? file.data : convertBase64ToUint8Array(file.data);
  return new Blob([data], { type: file.mediaType });
}
var VERSION = "2.0.47";
function createOpenAICompatible(options) {
  const baseURL = withoutTrailingSlash(options.baseURL);
  const providerName = options.name;
  const headers = {
    ...options.apiKey && { Authorization: `Bearer ${options.apiKey}` },
    ...options.headers
  };
  const getHeaders = () => withUserAgentSuffix(headers, `ai-sdk/openai-compatible/${VERSION}`);
  const getCommonModelConfig = (modelType) => ({
    provider: `${providerName}.${modelType}`,
    url: ({ path }) => {
      const url = new URL(`${baseURL}${path}`);
      if (options.queryParams) {
        url.search = new URLSearchParams(options.queryParams).toString();
      }
      return url.toString();
    },
    headers: getHeaders,
    fetch: options.fetch
  });
  const createLanguageModel = (modelId) => createChatModel(modelId);
  const createChatModel = (modelId) => new OpenAICompatibleChatLanguageModel(modelId, {
    ...getCommonModelConfig("chat"),
    includeUsage: options.includeUsage,
    supportsStructuredOutputs: options.supportsStructuredOutputs,
    supportedUrls: options.supportedUrls,
    transformRequestBody: options.transformRequestBody,
    metadataExtractor: options.metadataExtractor,
    convertUsage: options.convertUsage
  });
  const createCompletionModel = (modelId) => new OpenAICompatibleCompletionLanguageModel(modelId, {
    ...getCommonModelConfig("completion"),
    includeUsage: options.includeUsage
  });
  const createEmbeddingModel = (modelId) => new OpenAICompatibleEmbeddingModel(modelId, {
    ...getCommonModelConfig("embedding")
  });
  const createImageModel = (modelId) => new OpenAICompatibleImageModel(modelId, getCommonModelConfig("image"));
  const provider = (modelId) => createLanguageModel(modelId);
  provider.specificationVersion = "v3";
  provider.languageModel = createLanguageModel;
  provider.chatModel = createChatModel;
  provider.completionModel = createCompletionModel;
  provider.embeddingModel = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  provider.imageModel = createImageModel;
  return provider;
}
const createLovableAiGatewayProvider = (lovableApiKey) => createOpenAICompatible({
  name: "lovable",
  baseURL: "https://ai.gateway.lovable.dev/v1",
  headers: {
    "Lovable-API-Key": lovableApiKey,
    "X-Lovable-AIG-SDK": "vercel-ai-sdk"
  }
});
const DEFAULT_MODEL = "google/gemini-3-flash-preview";
const PATHFINDER_SYSTEM_PROMPT = `You are PathfinderAI — an expert student career guidance agent.
You are honest, specific, and never give generic advice. You always tailor your response to the student's exact class level and chosen career field. You think like the best mentor a student never had — someone who tells the truth about what it takes, gives real resources, and never sugarcoats difficulty or overpromises outcomes. You use simple language but never talk down to students. You reference real courses, real platforms, real books, real companies, real salary data for India (2024–25). When giving schedules, you are realistic about a student's actual available time. You always end responses with one specific actionable next step the student should do TODAY.`;
export {
  AbstractChat as A,
  DEFAULT_MODEL as D,
  NoObjectGeneratedError as N,
  PATHFINDER_SYSTEM_PROMPT as P,
  DefaultChatTransport as a,
  arrayType as b,
  coerce as c,
  convertToModelMessages as d,
  createLovableAiGatewayProvider as e,
  output_exports as f,
  generateText as g,
  stringType as h,
  numberType as n,
  objectType as o,
  streamText as s
};
