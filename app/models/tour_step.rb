class TourStep < ActiveRecord::Base
  attr_accessible :city, :country, :description, :durationDays, :sequence, :title, :transferToType
  
  belongs_to :tour
end
