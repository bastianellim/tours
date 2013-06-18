class CreateUserInfos < ActiveRecord::Migration
  def change
    create_table :user_infos do |t|
      t.string :firstName
      t.string :lastName
      t.string :gender
      t.date :birthday
      t.string :country
      t.string :city
      t.references :user

      t.timestamps
    end
    add_index :user_infos, :user_id
  end
end
