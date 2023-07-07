module Notifiable
  extend ActiveSupport::Concern

  included do
    after_commit "notify_#{self.name.underscore}_users".to_sym, on: %i[create update]
  end

  def notify_task_users
    recipient = ([assignee, reporter] - [current_user]).last
    return unless recipient

    return unless current_user

    changes = []
    attributes.except('updated_at').keys.each do |attr|
      changes << attr.sub('_id', '') if send("#{attr}_previously_changed?".to_sym)
    end

    message =
      if changes.include?('created_at') || changes.blank?
        "#{current_user.account} created a new task #{title} for #{recipient&.account}"
      else
        "#{current_user.account} updated #{changes.join(' ,')} of task #{title}"
      end
    
    notification = notifications.create(
      message: message,
      recipient: recipient,
      path: "projects/#{project_id}/boards"
    )

    ActionCable.server
               .broadcast(
                  "notification_channel_#{recipient.account}",
                  notification
                )
  end
end