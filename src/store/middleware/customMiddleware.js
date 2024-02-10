const customMiddleware = () => (next) => (action) => next(action);
export default customMiddleware;
