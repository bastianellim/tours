class Tour < ActiveRecord::Base
  
  has_many :tour_step
  belongs_to :user
  
  attr_accessible :airport, :budget, :commercial, :commercialPrice, :departureDate, :description, :period, :returnDate, 
  :shortDescription, :title, :travelerType
  
end
