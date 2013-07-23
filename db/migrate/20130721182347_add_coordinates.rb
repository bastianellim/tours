class AddCoordinates < ActiveRecord::Migration
  def up
    add_column :user_infos, :city_lat, :decimal, {:precision=>10, :scale=>6}
    add_column :user_infos, :city_lon, :decimal, {:precision=>10, :scale=>6}
    add_column :tour_steps, :city_lat, :decimal, {:precision=>10, :scale=>6}
    add_column :tour_steps, :city_lon, :decimal, {:precision=>10, :scale=>6}
  end

  def down
    remove_column :user_infos, :city_lat
    remove_column :user_infos, :city_lon
    remove_column :tour_steps, :city_lat
    remove_column :tour_steps, :city_lon
  end
end
