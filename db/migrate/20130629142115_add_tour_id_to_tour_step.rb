class AddTourIdToTourStep < ActiveRecord::Migration
  def change
    add_column :tour_steps, :tour_id, :integer
    add_index  :tour_steps, :tour_id
  end
end
