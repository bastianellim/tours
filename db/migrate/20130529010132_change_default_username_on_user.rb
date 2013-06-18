class ChangeDefaultUsernameOnUser < ActiveRecord::Migration
  def up
    change_column :users, :username, :string, :null => false, :default => ""
  end

  def down
  end
end
