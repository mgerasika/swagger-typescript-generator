class DependencyInjection {
    private _data: Map<string, ()=>any> = new Map<string, ()=>any>();
    private _instances: Map<string, any> = new Map<string, any>();

    public use<T>(name: string, construct: ()=> T) {
        this._data.set(name, construct);
    }

    public get<T>(name: string): T {
        // lazy initialization
        if (!this._instances.get(name)) {
            const fn = this._data.get(name);
            if(!fn) {
                console.error('Missed di constructor for ' + name);
            }
            const instance: T = fn && fn();
            this._instances.set(name, instance);
        }
        return this._instances.get(name);
    }
}

export const dependencyInjection = new DependencyInjection();