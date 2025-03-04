# nuxt-wp-example

Nuxt + Headless Wordpress Example

## Setup Wordpress

Before starting the nuxt project, you need to setup a Wordpress installation with the required plugins.

### Docker Compose

If you want to try out the system with a local Wordpress installation, you can use the provided `docker-compose.yml` file.

1. Run `docker-compose up -d`
2. Open `http://localhost:8080` in your browser
3. Follow the Wordpress installation steps

### Wordpress Plugins

1. Install the [WPGraphQL](https://wordpress.org/plugins/wp-graphql/) plugin
2. Install the [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) and [WPGraphQL Yoast SEO Addon](https://wordpress.org/plugins/add-wpgraphql-seo/) plugin
3. Install the [Faust.js](https://wordpress.org/plugins/faustwp/) plugin

## Setup

1. Clone the repository
2. Run `corepack enable`
3. Run `pnpm install`
4. Run `pnpm start`
5. Open `http://localhost:3000` in your browser

## Configuration

### GraphQL Data

You tweak the GraphQL Data to your liking in the `apps/website/queries` folder.

!NOTICE: make sure to enable "Enable Public Introspection" in the WPGraphQL settings and enable graphqlMiddleware.downloadSchema in the nuxt.config.ts file.
