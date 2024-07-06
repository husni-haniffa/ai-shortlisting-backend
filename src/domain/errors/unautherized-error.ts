class UnAutherizedError extends Error {
    constructor(message:string) {
         super(message);
        this.name = "UnAutherizedError"; 
    }
}

export default UnAutherizedError;