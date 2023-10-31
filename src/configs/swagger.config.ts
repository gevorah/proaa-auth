import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'PROAA Auth API',
      description: 'Documentation for PROAA Auth API',
      version: 'v1',
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts']
}

export const openapiSpecification = swaggerJSDoc(options)
