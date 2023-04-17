class AddIndexToTasks < ActiveRecord::Migration[6.0]
  def up
    add_index :tasks, %i[project_id assignee_id] unless index_exists?(:tasks, %i[project_id assignee_id])
    add_index :tasks, %i[project_id title], unique: true unless index_exists?(:tasks, %i[project_id title])
  end

  def down
    remove_index :tasks, %i[project_id assignee_id] if index_exists?(:tasks, %i[project_id assignee_id])
    remove_index :tasks, %i[project_id title] if index_exists?(:tasks, %i[project_id title])
  end
end
