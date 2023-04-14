class AddInviteTokenToParticipation < ActiveRecord::Migration[6.0]
  def up
    add_column :participations, :invite_token, :string
    add_column :participations, :invited_email, :string
    add_index :participations, :invite_token, unique: true
    add_index :participations, %i[invited_email project_id], unique: true
    add_index :participations, %i[project_id user_id], unique: true
  end

  def down
    remove_index :participations, %i[invited_email project_id]
    remove_index :participations, %i[project_id user_id]
    remove_column :participations, :invite_token
    remove_column :participations, :invited_email
  end
end
