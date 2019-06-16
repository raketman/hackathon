FROM php:7.3-fpm
# RUN выполняет идущую за ней команду в контексте нашего образа.
# В данном случае мы установим некоторые зависимости и модули PHP.
# Для установки модулей используем команду docker-php-ext-install.
# На каждый RUN создается новый слой в образе, поэтому рекомендуется объединять команды.
RUN apt-get update && apt-get install -y git zip curl wget \
    #&& docker-php-ext-install pdo_mysql
    #&& docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-configure mysqli --with-mysqli=mysqlnd \
    && docker-php-ext-install mysqli pdo pdo_mysql opcache

# mcrypt
#RUN apt-get update && \
#    apt-get install -y libmcrypt-dev
#RUN docker-php-ext-install mcrypt

#soap
#RUN apt-get update && \
#    apt-get install -y libxml2-dev && \
#    docker-php-ext-install soap


# memcache
#RUN apt-get update && \
#    apt-get install -y \
#        g++ \
#        zlib1g-dev \
#    && rm -rf /var/lib/apt/lists/* \
#    && pecl install memcache \
#    && docker-php-ext-enable memcache

#RUN apt-get update \
#  && apt-get install -y libmemcached11 libmemcachedutil2 build-essential libmemcached-dev libz-dev \
#  && pecl install memcached-2.2.0 \
#  && echo extension=memcached.so >> /usr/local/etc/php/conf.d/memcached.ini \
#  && apt-get remove -y build-essential libmemcached-dev libz-dev \
#  && apt-get autoremove -y \
#  && apt-get clean \
#  && rm -rf /tmp/pear

# Для dev
RUN apt-get update \
    && apt-get install -y iputils-ping \
    && apt-get install -y telnet \
    && apt-get install -y htop \
    && apt-get install -y vim

# Куда же без composer'а.
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Добавим vendor-dir прямо тут , типо для винды
#ADD composer.json /var/www/mfc
#- в папку /var/www/mfc надо
#ADD composer.lock /var/www/mfc
#RUN  composer install

# Добавим свой php.ini, можем в нем определять свои значения конфига
ADD php.ini /usr/local/etc/php/conf.d/hakaton.ini

# Указываем рабочую директорию для PHP
WORKDIR /var/www/hakaton

# Запускаем контейнер
# Из документации: The main purpose of a CMD is to provide defaults for an executing container. These defaults can include an executable,
# or they can omit the executable, in which case you must specify an ENTRYPOINT instruction as well.
CMD ["php-fpm"]