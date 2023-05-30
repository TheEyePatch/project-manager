class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.bigint :task_id
      t.bigint :user_id
      t.json :body
      t.timestamps
    end

    add_index :comments, :task_id
    add_index :comments, :user_id
  end
end
