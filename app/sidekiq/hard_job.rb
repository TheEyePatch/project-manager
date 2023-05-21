class HardJob
  include Sidekiq::Job
  queue_as :default

  def perform(*args)
    # Do something
  end
end
