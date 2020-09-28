import get from './get';
import { isObject } from './lang';
export default class EnvBase {
    /**
     * 这里可以在子类重写每个环境的变量的来源
     */
    getEnvName() {
        return undefined;
    }
    /**
     * 获取指定环境的配置信息
     * @author tianyingchun
     * @param  {String}   key     指定环境配置信息
     * @param  {String}   envName 环境名 test, inte, prod, 默认未定义, can aslo be an `key` path of source object.
     * @return {Any}      查看路径path.{envName} 找到了直接返回，找不到直接返回undefined.
     */
    env(key, envName) {
        return this.getFromSource(this, key, envName);
    }
    getFromSource(source, key, envName) {
        envName = envName || this.getEnvName() || 'prod';
        if (!key) {
            throw new Error('the `key` is required!');
        }
        const keyValues = get(source, `${key}`, undefined);
        if (isObject(keyValues)) {
            return get(keyValues, `${envName}`, undefined);
        }
        return keyValues;
    }
}
