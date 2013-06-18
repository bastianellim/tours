class AddUsernameToUser < ActiveRecord::Migration
  def change
    add_column :users, :username, :string
    
    add_index :users, :username,  :unique => true
    
    remove_index :users, :column => :email
    
  end
end
