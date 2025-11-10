Error.prepareStackTrace = (err, stack) => JSON.stringify({
    message: err.message,
    stack: stack.map(frame => ({
        file: frame.getFileName(),
        function: frame.getFunctionName(),
        column: frame.getColumnNumber(),
        line: frame.getLineNumber()
    }))
});

(global as any).to = async function <T>(promise: Promise<T>) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
};

export {};