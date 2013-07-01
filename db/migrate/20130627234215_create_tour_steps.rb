class CreateTourSteps < ActiveRecord::Migration
  def change
    create_table :tour_steps do |t|
      t.string :title
      t.integer :sequence
      t.string :country
      t.string :city
      t.integer :durationDays
      t.text :description
      t.string :transferToType

      t.timestamps
    end
  end
end
