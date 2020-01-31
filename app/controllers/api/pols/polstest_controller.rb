def execute_statement(sql)
  results = ActiveRecord::Base.connection.execute(sql)

  if results.present?
    return results
  else
    return nil
  end
end

class Api::Pols::PolstestController < ApplicationController
  def index
    puts 'hi_index'
    polstest = Polstest.select('id, st_AsText(pol) pol, name')
    render json: polstest
  end

  def create
    puts 'hi'+'1'
    # puts pol_params
    # polstest = Polstest.create(:pol=>'st_geomfromtext('+pol_params['pol']+',4326)', :name=>pol_params['name'])
    polstest = execute_statement("INSERT INTO " + pol_params['table'] + " (pol, name) VALUES (st_geomfromtext('" + pol_params['pol'] + "',4326),'" + pol_params['name'] + "')")
    if polstest
      render json: polstest
    else
      render json: polstest.errors
    end
  end

  def show
  end

  def destroy
  end

  private
  def pol_params
    params.permit(:pol, :name, :table)
  end
end
