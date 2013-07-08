class TourStepsController < ApplicationController  
  before_filter :authenticate_user!, :only => [:new, :create]
  
  
  def show
    @tour_step = TourStep.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tour }
    end
  end
  
  
  def new    
    @tour_step = TourStep.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @tour_step }
    end
  end
  
  
  def create  
    @tour = Tour.find(params[:tour_id])
    @tour.tour_step.build(params[:tour_step])

    respond_to do |format|
      if @tour.save
        format.html { redirect_to @tour, notice: 'Tour Step was successfully created.' }
        format.json { render json: @tour, status: :created, location: @tour }
        format.js do
          render :partial => "steps_list" 
        end
      else
        format.html { render action: "new" }
        format.json { render json: @tour.errors, status: :unprocessable_entity }
      end
    end
  end
  
    
  def mine
    @tours = current_user.tours
  end
end