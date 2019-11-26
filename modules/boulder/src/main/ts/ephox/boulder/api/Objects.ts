import * as ObjChanger from '../core/ObjChanger';
import * as ObjReader from '../core/ObjReader';
import * as ObjWriter from '../core/ObjWriter';
import { Option, Result, Results, Merger, Fun, Arr } from '@ephox/katamari';

// Perhaps this level of indirection is unnecessary.
const narrow = function (obj: {}, fields: any[]): {} {
  return ObjChanger.narrow(obj, fields);
};

const exclude = function (obj: {}, fields: any[]): {} {
  return ObjChanger.exclude(obj, fields);
};

const readOr = function <T>(key: string, fallback: T): ({}) => T {
  return ObjReader.readOr(key, fallback);
};

const wrap = function <V> (key: string, value: V): {[key: string]: V} {
  return ObjWriter.wrap(key, value);
};

const wrapAll = function (keyvalues: Array<{key: string; value: any}>): Record<string, any> {
  return ObjWriter.wrapAll(keyvalues);
};

const indexOnKey = function <T> (array: Array<{[T: string]: any}>, key: string): {[T: string]: any} {
  return ObjChanger.indexOnKey(array, key);
};

const mergeValues = function (values, base) {
  return values.length === 0 ? Result.value(base) : Result.value(
    Merger.deepMerge(
      base,
      Merger.merge.apply(undefined, values)
    )
    // Merger.deepMerge.apply(undefined, [ base ].concat(values))
  );
};

const mergeErrors = function (errors) {
  return Result.error(Arr.flatten(errors));
};

const consolidate = function (objs, base: {}): Result <{}, string> {
  const partitions = Results.partition(objs);
  return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
};

const hasKey = function (obj: {}, key: string): boolean {
  return ObjReader.hasKey(obj, key);
};

export {
  narrow,
  exclude,
  readOr,
  wrap,
  wrapAll,
  indexOnKey,
  hasKey,
  consolidate
};
