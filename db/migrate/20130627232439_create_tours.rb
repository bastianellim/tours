class CreateTours < ActiveRecord::Migration
  def change
    create_table :tours do |t|
      t.string :title
      t.text :shortDescription
      t.text :description
      t.string :period
      t.string :airport
      t.decimal :budget
      t.decimal :commercialPrice
      t.boolean :commercial
      t.date :departureDate
      t.date :returnDate
      t.string :travelerType

      t.timestamps
    end
  end
end
