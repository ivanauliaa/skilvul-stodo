class HelloUseCase {
    async execute(payload) {
        return Promise.resolve(
            {
                message: 'hello',
            },
        );
    }
}

module.exports = HelloUseCase;
