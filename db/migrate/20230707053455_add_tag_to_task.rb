class AddTagToTask < ActiveRecord::Migration[6.0]
  def up
    add_column :tasks, :tag, :string
    add_column :projects, :tag_prefix, :string
    add_index :tasks, %i[project_id tag], unique: true
  end

  def down
    remove_index :tasks, %i[project_id tag]
    remove_column :tasks, :tag
    remove_column :projects, :tag_prefix
  end
end
