class Api::VPols::PolsTestController < ApplicationController
  def index
    puts 'hi_index'
    pols_test = Pols_test.select('id, st_AsText(pol) pol, name')
    render json: pols_test
  end

  def create
    puts 'hi'
    pols_test = Pols_test.create!(pol_params)
    if pols_test
      render json: pols_test
    else
      render json: pols_test.errors
    end
  end

  def show
  end

  def destroy
  end

  private
  def pol_params
    params.permit(:pol, :name)
  end
end
