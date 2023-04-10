class AddInviteTokenToParticipation < ActiveRecord::Migration[6.0]
  def up
    add_column :participations, :invite_token, :string
    add_column :participations, :invited_email, :string
    add_index :participations, :invite_token, unique: true
    add_index :participations, :invited_email
  end

  def down
    remove_column :participations, :invite_token
    remove_column :participations, :invited_email
  end
end
