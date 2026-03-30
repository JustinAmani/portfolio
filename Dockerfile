FROM php:8.2-cli

# Install extensions
RUN apt-get update && apt-get install -y \
    git curl zip unzip libicu-dev libonig-dev libxml2-dev \
    && docker-php-ext-install intl mbstring xml \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Install JS dependencies and build assets
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build \
    && composer dump-autoload --optimize \
    && APP_ENV=prod php bin/console cache:warmup --no-debug

EXPOSE 8080

CMD ["php", "-S", "0.0.0.0:8080", "-t", "public/"]
