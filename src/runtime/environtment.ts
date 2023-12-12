import { RuntimeVal } from "./values";

export default class Environment {
     private parent?: Environment;
     private variables: Map<string, RuntimeVal> = new Map();

     constructor(parentENV?: Environment) {
          this.parent = parentENV;
     }
     public declareVar(varname: string, value: RuntimeVal): RuntimeVal {
          if(this.variables.has(varname)) {
               throw new Error(`Biến này ${varname} đã được khai báo`);
          }
          this.variables.set(varname, value);
          return value;
     }

     public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
          const env = this.resolve(varname);
          env.variables.set(varname, value);
          return value;
     }

     public lookupVar(varname: string): RuntimeVal {
          const env = this.resolve(varname);
          return env.variables.get(varname) as RuntimeVal; 
     }

     public resolve (varname: string): Environment {
          if (this.variables.has(varname)) {
               return this;
          }
          if (this.parent === undefined) {
               throw new Error(`Biến này ${varname} chưa được khai báo`);
          }
          return this.parent.resolve(varname);
     }
}

