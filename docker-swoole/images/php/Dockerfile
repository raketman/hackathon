FROM php:7.2-fpm
# RUN выполняет идущую за ней команду в контексте нашего образа.
# В данном случае мы установим некоторые зависимости и модули PHP.
# Для установки модулей используем команду docker-php-ext-install.
# На каждый RUN создается новый слой в образе, поэтому рекомендуется объединять команды.
RUN apt-get update && apt-get install -y git zip curl wget \
    #&& docker-php-ext-install pdo_mysql
    #&& docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-configure mysqli --with-mysqli=mysqlnd \
    && docker-php-ext-install mysqli pdo pdo_mysql opcache

# Для rabbitmq
RUN docker-php-ext-install sockets
RUN docker-php-ext-install bcmath

RUN apt-get update \
  && apt-get install -y libmemcached11 libmemcachedutil2 build-essential libmemcached-dev libz-dev \
  && pecl install memcached \
  && echo extension=memcached.so >> /usr/local/etc/php/conf.d/memcached.ini \
  && apt-get remove -y build-essential libmemcached-dev libz-dev \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /tmp/pear

# Для dev
RUN apt-get update \
    && apt-get install -y iputils-ping \
    && apt-get install -y telnet \
    && apt-get install -y htop \
    && apt-get install -y vim

#RUN apt-get update && apt-get install -y wget git unzip \
#    && pecl install xdebug-2.7.1 \
#    && docker-php-ext-enable xdebug


# Bcmath extension
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install pcntl

# Redis extension
#RUN wget http://pecl.php.net/get/redis-${PHPREDIS_VERSION}.tgz -O /tmp/redis.tar.tgz \
#    && pecl install /tmp/redis.tar.tgz \
#    && rm -rf /tmp/redis.tar.tgz \
#    && docker-php-ext-enable redis

RUN apt-get install vim -y && \
    apt-get install openssl -y && \
    apt-get install libssl-dev -y && \
    apt-get install wget -y

# Swoole extension
RUN cd /tmp && wget https://pecl.php.net/get/swoole-4.2.9.tgz && \
    tar zxvf swoole-4.2.9.tgz && \
    cd swoole-4.2.9  && \
    phpize  && \
    ./configure  --enable-openssl && \
    make && make install

RUN touch /usr/local/etc/php/conf.d/swoole.ini && \
    echo 'extension=swoole.so' > /usr/local/etc/php/conf.d/swoole.ini

# Куда же без composer'а.
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Указываем рабочую директорию для PHP
WORKDIR /var/www/hakaton

# Установим вендоры
#COPY composer.json composer.json
#COPY composer.lock composer.lock
#RUN  composer install --ignore-platform-reqs

# Добавим свой php.ini, можем в нем определять свои значения конфига
ADD images/php/ini/php.ini /usr/local/etc/php/conf.d/hakaton.ini
#ADD images/php/ini/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

EXPOSE 9502
EXPOSE 9501

# Запускаем контейнер
# Из документации: The main purpose of a CMD is to provide defaults for an executing container. These defaults can include an executable,
# or they can omit the executable, in which case you must specify an ENTRYPOINT instruction as well.
CMD ["php-fpm"]
#CMD ["composer install --ignore-platform-reqs"]