module Notifiable
  extend ActiveSupport::Concern

  included do
    after_create "notify_#{self.class.name.underscore}_users".to_sym
  end

  def notify_task_users
    recipient = ([assignee, reporter] - [current_user]).last
    return unless recipient

    notifications.create(
      message: "#{current_user.account} created a new task #{title} for #{recipient&.account}",
      recipient: recipient
    )
  end
end