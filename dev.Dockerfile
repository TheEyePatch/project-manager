FROM ruby:2.6.5

RUN apt-get update -qq && apt-get install -y curl
RUN curl -s https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y vim imagemagick nodejs postgresql-client build-essential && npm install --global yarn
RUN yarn add react-quill universal-cookie

RUN echo "NODE:" && node -v
RUN echo "NPM:" && npm -v

WORKDIR /project-manager
COPY . /project-manager
RUN npm install --force

RUN gem install bundler:1.17.2
RUN bundle install

# RUN chmod +x docker-rails.sh && chmod +x docker-vite.sh
CMD [ "bin/rails", "console" ]
