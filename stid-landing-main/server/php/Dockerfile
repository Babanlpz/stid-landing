FROM php:8.1.2-apache

RUN apt-get update
WORKDIR /var/www
# 1. development packages
RUN apt-get update && apt-get install -y \
		build-essential \
				git \
				curl \
				libpng-dev \
				libjpeg-dev \
				libfreetype6-dev \
				libjpeg62-turbo-dev \
				libmcrypt-dev \
				libgd-dev \
				jpegoptim optipng pngquant gifsicle \
				libonig-dev \
				libxml2-dev \
				zip \
				sudo \
				unzip \
				npm \
				nodejs \
    		libfreetype6-dev \
    		libpng-dev \
    		libwebp-dev \
    		libjpeg62-turbo-dev \
    		libmcrypt-dev \
    		libzip-dev \
            zip \
    		git \
    		default-mysql-client \
    && docker-php-ext-install \
    pdo_mysql \
    gd \
    zip \
    && a2enmod \
    rewrite

ADD . /var/www
RUN chown -R www-data:www-data /var/www

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
RUN a2enmod rewrite
RUN a2enmod rewrite headers
