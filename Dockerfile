FROM ruby:2.6.5

RUN apt-get update -qq && apt-get install -y curl
RUN curl -s https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y vim imagemagick nodejs postgresql-client build-essential && npm install --global yarn

WORKDIR /project-manager
COPY . /project-manager

RUN echo "NODE:" && node -v
RUN echo "NPM:" && npm -v
RUN echo "YARN:" && yarn --version

ENV RAILS_ENV production

RUN gem install bundler:1.17.2
RUN yarn install --ignore-engines && bundle install
RUN bundle exec vite install
RUN yarn
# RUN chmod +x docker-rails.sh && chmod +x docker-vite.sh
RUN bin/vite build --mode production
RUN RAILS_ENV=production bundle exec rake assets:precompile
RUN bin/rails db:prepare

EXPOSE 3000
CMD [ "bin/rails", "server", "-b", "0.0.0.0" ]
