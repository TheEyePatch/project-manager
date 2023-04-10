class ApplicationMailer < ActionMailer::Base
  default from: 'pj_manager@email.com'
  layout 'mailer'

  def app_email
    'pj_manager@email.com'
  end
end
